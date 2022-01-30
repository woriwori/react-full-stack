// nodemon으로 실행하는 파일
// express를 띄우기 위한 모든걸 import 한다.
import express from 'express'
import cors from 'cors'
import messagesRoute from "./routes/messages.js";
import usersRoute from "./routes/users.js";

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
)
const routes = [...messagesRoute, ...usersRoute]
routes.forEach(({ method, route, handler }) => {
    app[method](route, handler);
})

app.listen(8000, () => {
    console.log('server listening on 8000...')
    /*
    * Cannot GET / 라고 뜨게 되면 /에 해당하는 라우팅 정보가 정의되어있지 않기 때문에 발생하는 에러
    * */
})