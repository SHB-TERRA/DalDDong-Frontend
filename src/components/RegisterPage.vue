<template>
    <div id="page" class="row va ha">
        <div v-if="register" id="login-box" class="content column va ha marin pad">
            <h6 @click="openPage('LoginPage')">로그인으로 돌아가기</h6>
            <input v-model="userValue.name" type="text" placeholder="성명">
            <input v-model="userValue.email" type="email" placeholder="웹메일 주소">
            <input v-model="userValue.user_id" type="text" placeholder="사번">
            <input v-model="userValue.password" type="password" placeholder="비밀번호">
            <input v-model="pwchk" type="password" placeholder="비밀번호 다시 입력">
            <input type="submit" @click="requestMailAuth" value="다음">
        </div>
        <div v-if="!register" id="login-box" class="content column va ha marin pad">
            <input v-model="authcode" type="password" placeholder="인증코드 입력">
            <input @click="requestRegister" type="submit" value="회원가입">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            register: true,
            userValue: {
                name: '',
                user_id: '',
                password: '',
                email: ''
            },
            pwchk: '',
            authcode: ''
        }
    },
    methods: {
        openPage(page) {
            this.$router.push({name: page})
        },
        switchMode() {
            this.register = !(this.register)
        },
        requestMailAuth() {
            var reg = this.userValue

            if (!(reg.name) || !(reg.user_id) || !(reg.password) || !(reg.email)) {
                alert('모든 값을 입력해주세요')
                return
            }
            
            if (reg.password != this.pwchk) {
                alert('비밀번호가 일치하지 않습니다.')
                return
            }

            this.$http.post('http://20.194.29.5/users', reg).then(res => {
                console.log(res.data)
                if ('message' in res.data) {
                    alert(res.data['message'])
                    return
                }
                this.register = false
            })
        },
        requestRegister() {
            var reg = this.userValue

            this.$http.post('http://20.194.29.5/users/auth', {'email':reg.email, 'password':reg.password, 'key_for_verify':this.authcode}).then(res => {
                console.log(res.data)
                if ('message' in res.data) {
                    alert(res.data['message'])
                    return
                }
                this.$router.push({name: 'LoginPage'})
            })
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
