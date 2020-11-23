<template>
    <div id="page">
        <nav class="row va ha">
            <div id="menu-list" class="content row">
                <div id="menu-left" class="row">
                    <a class="menu-button" @click="openPage('MainPage')">내 캘린더</a>
                </div>
                <div id="menu-center" class="row va ha">
                    <b>파티 만들기</b>
                </div>
                <div id="menu-right" class="row">
                    <a class="menu-button" @click="openPage('LoginPage')">로그아웃</a>
                    <a class="menu-button">마이페이지</a>
                </div>
            </div>
        </nav>
        <div id="topbox"></div>
        <section class="row va ha">
            <div id="newpartyfield" class="content">
                <input id="title-field" type="text" v-model="newparty.title" :placeholder="(newparty.title||newparty.desc)?'제목':'파티 만들기'">
                <div v-if="newparty.title||newparty.desc">
                <input id="text-field" type="text" v-model="newparty.desc" placeholder="설명">
                <p>날짜</p>
                <input class="numpicker" type="number" v-model="newparty.hour" min="9" max="14"><span>시</span>
                <input class="numpicker" type="number" v-model="newparty.minute" min="0" max="55" step="5"><span>분</span><br>
                <input class="btn" type="button" value="파티 만들기">
                </div>
            </div>
        </section>
        <section class="column va ha">
            <div class="partybox content">
                <h2>마라탕 먹을 사람 구함</h2>
                <pre>제곧내</pre>
                <p>현재 참석자 {{2}}명. {{4}}명까지 참석 가능.</p>
                <input class="btn" type="button" value="파티 참가">
            </div>
            <div class="partybox content">
                <h2>연호 점없찐 구함</h2>
                <pre>연호 사람 붙어라</pre>
                <p>현재 참석자 {{1}}명. {{5}}명까지 참석 가능.</p>
                <input class="btn" type="button" value="파티 참가">
            </div>
        </section>
    </div>
</template>
<script>
export default {
    data() {
        return {
            newparty: {
                title: '',
                desc: '',
                hour: 11,
                minute: 20
            }
        }
    },
    methods: {
        openPage(page) {
            this.$router.push({name: page})
        }
    }
}
</script>
<style scoped>
#page {
    background: #fafafd;
}

nav {
    position: fixed;
    z-index: 2;
    top: 0;
    width: 100%;
    border-top: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    background: #fff;
}

.btn {
    padding: 10px;
    -webkit-appearance: none;
    border: 1px solid #dde;
    border-radius: 4px;
    background: #fff;
    font-size: 1em;
    color: #333;
    cursor: pointer;
}

.numpicker {
    margin: 5px;
    padding: 5px;
    width: 50px;
    font-size: 20px;
}

#menu-list {
    height: 48px;
    justify-content: space-between;
}
#menu-left, #menu-right {
    flex-basis: 350px;
}
#menu-center {
    width: 100px;
    flex-shrink: 0;
}
#menu-right {
    justify-content: flex-end;
}

.menu-button {
    vertical-align: middle;
    padding: 10px 15px;
    font-size: 17px;
    text-decoration: none;
    color: #555;
}
.menu-button:hover {
    background-color: #e4e4e4;
    cursor: pointer;
}

#topbox {
    height: 50px;
}

#title-field, #text-field {
    box-sizing: border-box;
    width: 100%;
    margin: 10px 0;
    padding: 10px;
    border: none;
    border-left: 5px solid;
    border-left-color: lightgray;
    border-radius: 0;
    background: none;
    color: #333;

    transition: border 0.5s;
}
#title-field:focus, #text-field:focus {
    border-left: 5px solid gray;
}
#title-field {
    font-size: 1.5em;
}
#text-field {
    height: 50px;
    resize: none;
    font-size: 1em;
    font-family: inherit;
    
    transition: all 1s;
}

#newpartyfield, .partybox {
    margin-top: 25px;
    border: 1px solid #e4e4e4;
    background: #fff;
    padding: 30px;
}
</style>