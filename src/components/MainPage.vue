<template>
    <div id="page">
        <nav class="row va ha">
            <div id="menu-list" class="content row">
                <div id="menu-left" class="row">
                    <a v-if="!scheduleMode" class="menu-button" @click="scheduleMode=true">약속 추가</a>
                    <a v-if="scheduleMode" class="menu-button" @click="scheduleMode=false">취소</a>
                    <a class="menu-button" @click="openPage('NewPartyPage')">파티 만들기</a>
                </div>
                <div id="menu-center" class="row va ha">
                    <b>캘린더</b>
                </div>
                <div id="menu-right" class="row">
                    <a class="menu-button" @click="$emit('set-user-status', false)">로그아웃</a>
                    <a class="menu-button">마이페이지</a>
                </div>
            </div>
        </nav>
        <div id="topbox"></div>
        <section v-if="scheduleMode" class="row va ha">
            <div id="schedule" class="content">
                <input id="title-field" type="text" v-model="schedule.title" placeholder="약속 이름">
                <input v-for="participant in schedule.participants" class="btn" type="button" :key="participant" :value="participant" @click="deleteParticipant(participant)">
                <input id="text-field" type="text" v-model="schedule.participantValue" placeholder="..참석자 추가" @keyup.enter="addParticipant">
                <input id="text-field" type="text" v-model="schedule.place" placeholder="약속 장소">
                <input id="text-field" type="text" v-model="schedule.mplace" placeholder="모임 장소">
                <p>{{schedule.year}}년 {{schedule.month}}월 {{schedule.date}}일</p>
                <input class="numpicker" type="number" v-model="schedule.hour" min="9" max="14"><span>시</span>
                <input class="numpicker" type="number" v-model="schedule.minute" min="0" max="55" step="5"><span>분</span><br>
                <input class="btn" type="button" @click="requestAddEvent" value="약속 추가">
                <!--일단 행번으로 보내고 나중에 동명이인 선택창 추가-->
            </div>
        </section>
        <section class="row va ha">
            <CalendarComp id="calendar" class="content" :user-info="userInfo" :schedule-mode="scheduleMode" :selected-year="schedule.year" :selected-month="schedule.month" :selected-date="schedule.date" @change-schedule="changeScheduleMode" @change-selected="changeSelected"/>
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
            scheduleMode: false,
            schedule: {
                title: '',
                participants: [],
                participantValue: '',
                mplace: '',
                place: '',
                year: 0,
                month: 0,
                date: 0,
                hour: 11,
                minute: 20
            },
        }
    },
    methods: {
        openPage(page) {
            this.$router.push({name: page})
        },
        addParticipant() {
            this.schedule.participants.push(this.schedule.participantValue)
            this.schedule.participantValue = ''
        },
        deleteParticipant(participant) {
            this.schedule.participants.splice(this.schedule.participants.indexOf(participant), 1)
        },
        changeSelected(key, value) {
            switch (key) {
                case 'y':
                    this.schedule.year = value
                    break
                case 'm':
                    this.schedule.month = value
                    break
                case 'd':
                    this.schedule.date = value
                    break
            }
        },
        changeScheduleMode(mode) {
            this.scheduleMode = mode
        },
        requestAddEvent() {
            var sch = this.schedule
            var cvt = this.convertDate

            this.$http.post(`/calendar/${this.userInfo.id}`, {
                    "participants":sch.participants,
                    "promise_day":`${sch.year}-${cvt(sch.month)}-${cvt(sch.date)}`,
                    "promise_time":`${cvt(sch.hour)}:${cvt(sch.minute)}`,
                    "meeting_place":sch.mplace,
                    "place":sch.place,
                    "user_id":this.userInfo['user_id']
                }).then(res => {
                console.log(res.data)
                if ('message' in res.data) {
                    alert(res.data.message)
                    this.scheduleMode = false
                } else {
                    alert('등록 실패')
                }
            })
        },
        convertDate(num) {
            if (num.length = 1) {
                return `0${num}`
            } else {
                return num
            }
        }
    },
    watch: {
        scheduleMode(val) {
            if (!val) {
                this.schedule = {
                    title: '',
                    participants: [],
                    participantValue: '',
                    mplace: '',
                    place: '',
                    year: 0,
                    month: 0,
                    date: 0,
                    hour: 11,
                    minute: 20
                }
            }
        }
    },
    mounted() {
        if ('logout' in this.userInfo) {
            this.$router.push({name: 'LoginPage'})
            return
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

#schedule {
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
