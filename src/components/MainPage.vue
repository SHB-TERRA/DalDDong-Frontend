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
                    <a class="menu-button" @click="openPage('LoginPage')">로그아웃</a>
                    <a class="menu-button">마이페이지</a>
                </div>
            </div>
        </nav>
        <section v-if="scheduleMode" class="row va ha">
            <div id="schedule" class="content">
                <input id="title-field" type="text" v-model="schedule.title" placeholder="약속 이름">
                <input v-for="participant in schedule.participants" class="btn" type="button" :key="participant" :value="participant" @click="deleteParticipant(participant)">
                <input id="text-field" type="text" v-model="schedule.participantValue" placeholder="..참석자 추가" @keyup.enter="addParticipant">
                <p>{{dateSelected.format('Y')}}년 {{dateSelected.format('M')}}월 {{dateSelected.get('date')}}일 {{days[dateSelected.format('d')]}}요일</p>
                <input class="numpicker" type="number" v-model="schedule.hour" min="10" max="22"><span>시</span>
                <input class="numpicker" type="number" v-model="schedule.minute" min="0" max="55" step="5"><span>분</span><br>
                <input class="btn" type="button" value="약속 추가">
            </div>
        </section>
        <section class="row va ha">
            <div id="calendar" class="content">
                <div class="month">
                    <ul>
                        <li class="prev" @click="changeMonth(1)">◀</li>
                        <li class="next" @click="changeMonth(0)">▶</li>
                        <li><span style="font-size:12px">{{year}}년</span> {{month}}월</li>
                    </ul>
                </div>
                <ul class="weekdays">
                    <li v-for="day in days" :key="day">{{day}}</li>
                </ul>
                <ul class="dates">
                    <li v-for="blank in firstDayOfMonth" :key="blank+100">&nbsp;</li><li v-for="date in daysInMonth" :key="date" :id="(date==initialDate && month==initialMonth && year==initialYear) ? 'current-day' : ''" @click="dateSelectedChange(date)">{{date}}</li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    data() {
        return {
            scheduleMode: false,
            schedule: {
                title: '',
                participants: [],
                participantValue: '',
                hour: 11,
                minute: 20
            },
            today: moment(),
            dateContext: moment(),
            dateSelected: moment(),
            days: ['일', '월', '화', '수', '목', '금', '토'],
            year: 0,
            month: 0,
            daysInMonth: 0,
            currentDate: 0,
            firstDayOfMonth: 0,
            initialDate: 0,
            initialMonth: 0,
            initialYear: 0
        }
    },
    methods: {
        openPage(page) {
            this.$router.push({name: page})
        },
        changeMonth(reverse) {
            if (!reverse) {
                this.dateContext = moment(this.dateContext).add(1, 'month')
            } else {
                this.dateContext = moment(this.dateContext).subtract(1, 'month')
            }
            this.initCalendar()
        },
        initCalendar() {
            this.year = this.dateContext.format('Y')
            this.month = this.dateContext.format('M')
            this.currentDate = this.dateContext.get('date')
            this.firstDayOfMonth = moment(this.dateContext).subtract((this.currentDate - 1), 'days').weekday()
            this.daysInMonth = this.dateContext.daysInMonth()
            this.initialDate = this.today.format('D')
            this.initialMonth = this.today.format('M')
            this.initialYear = this.today.format('Y')
        },
        addParticipant() {
            this.schedule.participants.push(this.schedule.participantValue)
            this.schedule.participantValue = ''
        },
        deleteParticipant(participant) {
            this.schedule.participants.splice(this.schedule.participants.indexOf(participant), 1)
        },
        dateSelectedChange(date) {
            this.scheduleMode = false
            this.dateSelected.date(date)
            this.dateSelected.month(this.month-1)
            this.dateSelected.year(this.year)
            this.scheduleMode = true
        }
    },
    mounted() {
        this.initCalendar()
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

#calendar, #schedule {
    margin-top: 75px;
    border: 1px solid #e4e4e4;
    background: #fff;
}
#calendar li {
    list-style-type: none;
}
#schedule {
    padding: 30px;
}

.month {
    padding: 50px 25px;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
}

.month ul {
    margin: 0;
    padding: 0;
}

.month ul li {
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 3px;
}

.month .prev, .month .next {
    cursor: pointer;
    user-select: none;
}
.month .prev {
    float: left;
}
.month .next {
    float: right;
}

.weekdays {
    margin: 0;
    padding: 10px 0;
}

.weekdays li {
    display: inline-block;
    width: 14.1%;
    color: #666;
    text-align: center;
}

.dates {
    padding: 10px 0;
    margin: 0;
}

.dates li {
    display: inline-block;
    width: 14.1%;
    height: 50px;
    text-align: center;
    font-size: 12px;
    color: #777;
    cursor: pointer
}

#current-day {
    background: #1abc9c;
    color: white !important
}

@media screen and (max-width:720px) {
    .weekdays li, .dates li {width: 13.1%;}
}

@media screen and (max-width: 420px) {
    .weekdays li, .dates li {width: 12.5%;}
    .days li .active {padding: 2px;}
}

@media screen and (max-width: 290px) {
    .weekdays li, .dates li {width: 12.2%;}
}
</style>