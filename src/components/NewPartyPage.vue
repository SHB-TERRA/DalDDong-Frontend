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
                    <a class="menu-button" @click="$emit('set-user-status', false)">로그아웃</a>
                    <a class="menu-button">마이페이지</a>
                </div>
            </div>
        </nav>
        <div id="topbox"></div>
        <section class="row va ha">
            <div id="newpartyfield" class="content">
                <input id="title-field" type="text" v-model="newparty.title" :placeholder="(newparty.title||newparty.desc)?'제목':'파티 만들기'">
                <div v-if="newparty.title||newparty.desc">
                    <input id="text-field" type="text" v-model="newparty.place" placeholder="약속 장소">
                    <input id="text-field" type="text" v-model="newparty.mplace" placeholder="모임 장소">
                    <span>최대 참가자</span><input class="numpicker" type="number" v-model="newparty.maxp" min="2" max="50"><span>명</span>
                    <p><span v-if="newparty.year">{{newparty.year}}년 {{newparty.month}}월 {{newparty.date}}일</span> <span class="link" v-if="!scheduleMode" @click="scheduleMode=true">날짜 선택</span><span class="link" v-if="scheduleMode" @click="scheduleMode=false">취소</span></p>
                    <input class="numpicker" type="number" v-model="newparty.hour" min="9" max="14"><span>시</span>
                    <input class="numpicker" type="number" v-model="newparty.minute" min="0" max="55" step="5"><span>분</span><br>
                    <input class="btn" type="button" @click="requestCreate" value="파티 만들기">
                    <input class="btn" type="button" @click="resetPartyField" value="취소">
                </div>
            </div>
        </section>
        <section class="column va ha">
            <CalendarComp v-if="scheduleMode" id="calendar" class="content" :user-info="userInfo" :schedule-mode="scheduleMode" :selected-year="newparty.year" :selected-month="newparty.month" :selected-date="newparty.date" @change-schedule="changeScheduleMode" @change-selected="changeSelected" @close="scheduleMode=false" />
        </section>
        <section v-if="partieslen" class="column va ha">
            <div v-for="num in partieslen" :key="num-1" class="partybox content">
                <h2>{{parties[num-1]['name']}}</h2>
                <p>{{parties[num-1]['place']}}</p>
                <p>{{parties[num-1]['promise_time']}}에 {{parties[num-1]['meeting_place']}}에서 모임</p>
                <p>{{parties[num-1]['max_people']}}명까지 참석 가능.</p>
                <p>{{parties[num-1]['user_id']}}님이 {{parties[num-1]['createdAt']}}에 올렸습니다.</p>
                <input class="btn" type="button" @click="requestJoin(parties[num-1]['id'])" value="파티 참가">
                <input class="btn" type="button" @click="requestDelete(parties[num-1]['id'])" style="background: lightred" value="삭제">
            </div>
        </section>
    </div>
</template>

<script>
import CalendarComp from './CalendarComp'

export default {
    components: {
        CalendarComp
    },
    props: ['userInfo'],
    data() {
        return {
            parties: [],
            partieslen: 0,
            scheduleMode: false,
            newparty: {
                title: '',
                place: '',
                mplace: '',
                maxp: 2,
                year: 0,
                month: 0,
                date: 0,
                hour: 11,
                minute: 20
            }
        }
    },
    methods: {
        openPage(page) {
            this.$router.push({name: page})
        },
        changeScheduleMode(mode) {
            this.scheduleMode = mode
        },
        changeSelected(key, value) {
            switch (key) {
                case 'y':
                    this.newparty.year = value
                    break
                case 'm':
                    this.newparty.month = value
                    break
                case 'd':
                    this.newparty.date = value
                    break
            }
        },
        resetPartyField() {
            this.scheduleMode = false
            this.newparty = {title: '', place: '', mplace: '', maxp: 2, year: 0, month: 0, date: 0, hour: 11, minute: 20}
        },
        initPage() {
            this.$http.get('/promises').then(res => {
                console.log(res.data)
                this.parties = res.data['rows']
                this.partieslen = res.data['count']
            })
        },
        requestCreate() {
            var np = this.newparty
            var cvt = this.convertDate

            this.$http.post(`/promises`, {
                    "meeting_place":np.mplace,
                    "place":np.place,
                    "max_people":np.maxp,
                    "promise_time":`${sch.year}-${cvt(sch.month)}-${cvt(sch.date)} ${cvt(sch.hour)}:${cvt(sch.minute)}:00`,
                    "name":np.title,
                    "user_id":this.userInfo['user_id']
                }).then(res => {
                    console.log(res.data)
                    alert('파티 생성 성공')
                    this.resetPartyField()
                    this.initPage()
                    // 생성한 파티를 내 약속에 추가하는건 백엔드가 해주는지?
            })
        },
        requestJoin(id) {
            this.$http.put(`/promises/${id}`, {"user_id":this.userInfo['user_id']}).then(res => {
                console.log(res.data)
                if ('message' in res.data) {
                    alert(res.data['message'])
                    return
                }
                alert('파티 참가 성공')
                this.initPage()
                // 참가한 파티를 내 약속에 추가하는건 백엔드가 해주는지?
            })
        },
        requestDelete(id) {
            if (confirm('정말로 이 약속을 삭제하시겠습니까?')) {
                this.$http.delete(`/promises/${id}`).then(res => {
                    console.log(res.data)
                    if ('message' in res.data) {
                        alert(res.data['message'])
                        return
                    }
                    alert('삭제 성공')
                    this.initPage()
                    // 참가한 파티를 내 약속에서 없애는건 백엔드가 해주는지?
                })
            }
        },
        convertDate(num) {
            if (num.length = 1) {
                return `0${num}`
            } else {
                return num
            }
        }
    },
    mounted() {
        // if ('logout' in this.userInfo) {
        //     this.$router.push({name: 'LoginPage'})
        //     return
        // }
        this.initPage()
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

pre {
    white-space: normal;
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
#newpartyfield .btn {
    margin: 10px 0;
}

.link {
    color: darkblue;
    text-decoration: underline;
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

#calendar {
    margin-top: 25px;
    border: 1px solid #e4e4e4;
    background: #fff;
}
</style>
