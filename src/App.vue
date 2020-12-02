<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style>
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
