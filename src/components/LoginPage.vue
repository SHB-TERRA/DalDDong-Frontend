<template>
    <div id="page" class="row va ha">
        <div id="login-box" class="content column va ha marin pad">
            <input v-model="userValue.email" type="text" placeholder="메일">
            <input v-model="userValue.password" type="password" placeholder="비밀번호">
            <input @click="requestLogin" type="submit" value="로그인">
            <h6 @click="openPage('RegisterPage')">또는 회원가입</h6>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userValue: {
                password: '',
                email: ''
            },
        }
    },
    methods: {
        openPage(page) {
            this.$router.push({name: page})
        },
        requestLogin() {
            this.axios.post('/users/login', this.userValue).then(
                res => { console.log(res.data) })
        },
    }
}
</script>

<style scoped>
.marin > * {
    margin: 7.5px;
}

.pad {
    padding: 40px;
}

#page {
    background: linear-gradient(to bottom, rgba(216,241,230,0.46), rgba(233,226,226,0.28));
}

#login-box {
    border: 1px solid #e4e4e4;
    background: #fff;
}

h6 {
    cursor: pointer;
}
</style>
