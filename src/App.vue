<template>
    <div id="app">
        <router-view :user-info="userInfo" @set-user-status="setUserStatus" />
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            userInfo: {
                logout: true
            }
        }
    },
    methods: {
        setUserStatus(login, data) {
            var reg = this.userInfo

            if (login) {
                reg = data
            } else {
                reg = {logout: true}
                this.$http.post('/users/logout', {'email':reg.email, 'password':reg.password}).then(res => {
                    console.log(res.data)
                    this.$router.push({name: 'LoginPage'})
                })
            }
        }
    }
}
</script>

<style>
@font-face {
    font-family: SpoqaHanSans;
    src: url('./assets/spoqahansans-reg.woff') format('woff')
}
@font-face {
    font-family: SpoqaHanSansBold;
    src: url('./assets/spoqahansans-bold.woff') format('woff')
}

* {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    text-shadow: rgba(0,0,0,.01) 0 0 1px;
    word-break: keep-all;
    font-family: SpoqaHanSans, sans-serif;
}

.btn, button, h2 {
    font-family: SpoqaHanSansBold, sans-serif !important;
}

#app {
    width: 100%;
    min-height: 100vh;
}
#page {
    width: 100%;
    height: 100%;
    min-height: 100vh;
}

.row {
    display: flex;
    flex-direction: row;
}
.column {
    display: flex;
    flex-direction: column;
}
.ha {
    justify-content: center;
}
.va {
    align-items: center;
}
.content {
    width: 100%;
    max-width: 900px;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 0 20px;
}
</style>
