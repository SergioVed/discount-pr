import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import cors from "cors"
import { AppExceptionFilter } from 'AppExceptionFilter';


const start = async () => {
  try {
    const PORT = process.env.PORT || 7000
    const app = await NestFactory.create(AppModule)
    app.use(cors())
    app.use(cookieParser());
    app.useGlobalFilters(new AppExceptionFilter())
    app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

start()