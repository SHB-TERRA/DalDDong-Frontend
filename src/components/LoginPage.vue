<template>
    <div id="page" class="row va ha">
        <div v-if="!register" id="login-box" class="content column va ha marin pad">
            <input v-model="userValue.id" type="text" placeholder="사번">
            <input v-model="userValue.pw" type="password" placeholder="비밀번호">
            <input :click="doLogin" type="submit" value="로그인">
            <h6 @click="switchMode">또는 회원가입</h6>
        </div>
        <div v-if="register" id="login-box" class="content column va ha marin pad">
            <h6 @click="switchMode">로그인으로 돌아가기</h6>
            <input v-model="userValue.mail" type="email" placeholder="웹메일 주소">
            <input v-model="userValue.id" type="text" placeholder="사번">
            <input v-model="userValue.pw" type="password" placeholder="비밀번호">
            <input v-model="userValue.pwchk" type="password" placeholder="비밀번호 다시 입력">
            <input type="submit" value="회원가입">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            register: false,
            userValue: {
                id: '',
                pw: '',
                pwchk: '',
                mail: ''
            }
        }
    },
    methods: {
        switchMode() {
            this.register = !(this.register)
        },
        doLogin() {
            // this.$http.get('/api/login')
        }
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