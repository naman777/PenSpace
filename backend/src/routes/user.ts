import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign,verify } from 'hono/jwt'
import { signinInput, signupInput } from "@namankundra/blogging-app";



export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
        JWT_SECRET: string
	}
}>()


userRouter.post('/signup', async (c) => {
  
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    
    const body = await c.req.json();
    
    const {success } = signupInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({message:"Invalid input"})
    }


    try {
        const check = await prisma.user.findUnique({
          where:{
            email: body.email
          }
        })

        if(check){
          return c.json({message:"Email already registered"})
        }

          const user = await prisma.user.create({
              data: {
          name:body.name,
                  email: body.email,
                  password: body.password
              }
          });
          const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
          return c.json({ jwt });
  
      } catch(e) {
        console.log(e)
        c.status(403);
        return c.json({ message: "error while signing up" });
      }
    
    
  })
  
  userRouter.post('/signin', async (c) => {
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    const {success } = signinInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({message:"Invalid input"})
    }

    const user = await prisma.user.findUnique({
      where: {
        email: body.email
      }
  
    });
  
    if(!user){
      c.status(403);
      return c.json({ message: "user not found" });
    }
  
    if(user.password===body.password){
      const token = await sign({id:user.id}, c.env.JWT_SECRET);
      return c.json({jwt:token});
    }
    else{
      c.status(403);
      return c.json({ message: "password not match" });
    }
  
  })
  
  userRouter.post("/me", async (c)=>{
    
    
    let body = await c.req.json();
    console.log(body)
    let token = body.token
    try {
        const user = await verify(token,c.env.JWT_SECRET);
        c.status(200)
        return c.json({user:user});
    }
    catch (error) {
      c.status(411);
      return c.json({ error: "token not valid" });
  }
  
  

})