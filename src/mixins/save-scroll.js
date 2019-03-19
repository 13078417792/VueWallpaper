
import {mapMutations,mapGetters} from 'vuex'

const SaveScroll = {
    data(){
        return {
            readyAddScrollListener:false,
            parent:null
        }
    },
    created(){
        this.addListener()
    },
    activated(){
        this.reductionPosition()
        this.addListener()
    },
    beforeDestroy(){
        this.reset()
        this.parent = null
        this.removeListener()
    },
    deactivated(){
        this.reset()
        this.removeListener()
    },
    computed:{
        ...mapGetters({
            getY:'ScrollPosition/getY'
        })
    },
    methods:{
        ...mapMutations({
            updatePosition:'ScrollPosition/updateY'
        }),
        getParentElement(){
            if(this.$options.name==='Scroll'){
                const parent = this.parent
                if(!this.$el){
                    return parent || null
                }
                this.parent = this.$el
                return this.$el
            }else{
                const parent = this.parent
                if(!this.$el.parentElement){
                    return parent || null
                }
                this.parent = this.$el.parentElement
                return this.$el.parentElement
            }
        },
        // 还原上次位置
        reductionPosition(){
            const parent = this.getParentElement()
            if(!parent) return;
            const positionY = this.getY(this._uid) || 0
            parent.scrollTo({
                top:positionY
            })
        },
        reset(){
            const parent = this.getParentElement()
            if(!parent) return;
            parent.scrollTo({
                top:0
            })
        },
        handler(){
            const parent = this.getParentElement()
            if(!parent) return
            this.updatePosition({uid:this._uid,position:parent.scrollTop})
        },
        addListener(){
            if(this.readyAddScrollListener) return;
            window.addEventListener('scroll',this.handler,true)
            this.readyAddScrollListener = true
        },
        removeListener(){
            if(!this.readyAddScrollListener) return;
            window.removeEventListener('scroll',this.handler,true)
            this.readyAddScrollListener = false
        }
    }
}


export default SaveScroll