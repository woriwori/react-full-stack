import './index.scss'

/*
* next 의 필수 파일
* 아래 코드는 기본 템플릿이라고 보면 됨
* */

const App = ({ Component, pageProps }) => <Component {...pageProps} />

App.getInitialProps = async ({ ctx, Component }) => {
    const pageProps = await Component.getInitialProps?.(ctx)
    return { pageProps }
}

export default App