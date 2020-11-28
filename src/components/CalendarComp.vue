<template>
    <div>
        <div class="month">
            <ul>
                <li class="prev" @click="changeMonth(1)">◀</li>
                <li class="next" @click="changeMonth(0)">▶</li>
                <li><span style="font-size:12px">{{contextYear}}년</span> {{contextMonth}}월</li>
            </ul>
        </div>
        <ul class="weekdays">
            <li v-for="day in days" :key="day">{{day}}</li>
        </ul>
        <ul class="dates">
            <li v-for="blank in firstDayOfMonth" :key="blank+100"><br>&nbsp;</li><li v-for="date in daysInMonth" :key="date" :id="(contextYear==initialYear && contextMonth==initialMonth && date==initialDate) ? 'current-day' : ((contextYear==selectedYear && contextMonth==selectedMonth && date==selectedDate) ? 'selected-day' : '')" @click="dateSelectedChange(date)">{{date}}<br><span class="event-day">undefined</span></li>
        </ul>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    props: ['scheduleMode', 'selectedDate', 'selectedMonth', 'selectedYear'],
    data() {
        return {
            days: ['일', '월', '화', '수', '목', '금', '토'],
            dateInitial: moment(),
            initialYear: 0,
            initialMonth: 0,
            initialDate: 0,
            dateContext: moment(),
            contextYear: 0,
            contextMonth: 0,
            contextDate: 0,
            daysInMonth: 0,
            firstDayOfMonth: 0,
        }
    },
    methods: {
        openPage(page) {
            this.$router.push({name: page})
        },
        initCalendar() {
            this.initialYear = this.dateInitial.format('Y')
            this.initialMonth = this.dateInitial.format('M')
            this.initialDate = this.dateInitial.format('D')
            this.contextYear = this.dateContext.format('Y')
            this.contextMonth = this.dateContext.format('M')
            this.contextDate = this.dateContext.format('D')
            this.firstDayOfMonth = moment(this.dateContext).subtract((this.contextDate - 1), 'days').weekday()
            this.daysInMonth = this.dateContext.daysInMonth()
        },
        changeMonth(reverse) {
            if (!reverse) {
                this.dateContext = moment(this.dateContext).add(1, 'month')
            } else {
                this.dateContext = moment(this.dateContext).subtract(1, 'month')
            }
            this.initCalendar()
        },
        dateSelectedChange(date) {
            if (!this.scheduleMode) return
            this.$emit('change-selected', 'd', date)
            this.$emit('change-selected', 'm', this.contextMonth)
            this.$emit('change-selected', 'y', this.contextYear)
        },
    },
    watch: {
        scheduleMode(mode) {
            if (mode) {
                this.$emit('change-selected', 'd', this.initialDate)
                this.$emit('change-selected', 'm', this.contextMonth)
                this.$emit('change-selected', 'y', this.contextYear)
                this.initCalendar()
            } else {
                this.$emit('change-selected', 'y', 0)
                this.initCalendar()
            }
        }
    },
    mounted() {
        this.initCalendar()
    }
}
</script>

<style scoped>
li {
    list-style-type: none;
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
    color: darkred;
    font-weight: bolder;
}

#selected-day {
    background: lightgray;
    transform: scale(0.9);
    transition: .5s ease;
}

#event-day {
    background: purple;
    padding: 0 3px;
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
