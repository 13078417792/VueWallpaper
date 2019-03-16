import Vue from 'vue'

type position = {
    [componentUID:number]:number
}

type state = {
    positionX:position,
    positionY:position
}

type commitData = {
    position:number,
    uid:number
}

const state:state = {
    positionX:{},
    positionY:{}
}

const mutations = {
    updateX(state:state,data:commitData){
        Vue.set(state.positionX,data.uid,data.position)
    },
    updateY(state:state,data:commitData){
        Vue.set(state.positionY,data.uid,data.position)
    }
}

const getters = {
    getX:(state:state)=>(uid:number)=>state.positionX[uid],
    getY:(state:state)=>(uid:number)=>state.positionY[uid]
}

export default {
    state,mutations,getters,namespaced:true
}