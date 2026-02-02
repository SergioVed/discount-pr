import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';


const start = async () => {
  try {
    const PORT = process.env.PORT || 7000
    const app = await NestFactory.create(AppModule)
    app.use(cookieParser());
    app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

start()