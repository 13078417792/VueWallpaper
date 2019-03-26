<template>
    <div class="login">
        <p class="tips">
            请先登录
        </p>

        <div class="form">
            <cell-group>
                <field v-model="form.username" placeholder="请输入用户名" clearable :error-message="errors.username">
                    <Icon slot="left-icon" type="user" />
                </field>
                <field v-model="form.password" type="password" placeholder="请输入密码" left-icon="lock" clearable :error-message="errors.password"/>

            </cell-group>
            <cell-group class="login-action-wrapper">
                <Button type="primary" block @click="submit" >登录</Button>
            </cell-group>

        </div>
    </div>
</template>

<script>
    import { CellGroup,Field,Button,Cell,Toast  } from 'vant';
    import Icon from '@components/Icon';
    import Validator from 'async-validator'
    import {mapMutations} from 'vuex'

    const validator = new Validator({
        username:[{required:true,message:'请输入用户名'}],
        password:[{required:true,message:'请输入密码'}]
    })

    export default {
        name: "UserLogin",
        components:{CellGroup,Field,Icon,Button,Cell},
        data(){
            return {
                form:{
                    username:'397201698@qq.com',
                    password:'397201698zcj'
                },errors:{
                    username:'',
                    password:''
                }
            }
        },
        methods:{
            ...mapMutations({
                setAuth:'Storage/setAuth',
                saveUserInfo:'Storage/saveUserInfo',
                updateFromLocal:'Storage/updateFromLocal'
            }),
            submit(){
                const {form} = this
                const toast = Toast.loading({
                    mask: true,
                    message: '登录中...',
                    duration:0
                })
                validator.validate(form,{first:true},(errors,fields)=>{
                    let result_errors = {
                        username:'',
                        password:''
                    }
                    if(errors) {
                        Object.keys(this.errors).forEach(field=>{
                            if(fields.hasOwnProperty(field)){
                                result_errors[field] = fields[field].map(el=>el.message).join(',')
                            }else{
                                result_errors[field] = ''
                            }
                        })
                        this.$nextTick(()=>{
                            toast.clear()
                        })
                    }else{
                        this.$request.login(form.username,form.password,false).then(result=>{
                            console.log(result)
                            this.setAuth(result.sessionId)
                            toast.clear();
                            Toast.success({
                                duration:3000,
                                message:'登录成功'
                            })
                            this.saveUserInfo(result.res)
                            this.updateFromLocal()
                        }).catch(result=>{
                            toast.clear();
                            Toast.fail({
                                message:result.msg || result,
                                duration:3000
                            })
                        })
                    }
                    this.errors = result_errors
                })
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../assets/styles/var.less";
    .login{

        .tips{
            width:100%;
            text-align:center;
            margin:0;
            padding:1em 0;
            font-size:.8em;
            border-bottom:1px solid @border-color;
        }

        .form{
            margin:1em 0;

            .login-action-wrapper{
                margin-top:1em;
            }
        }
    }
</style>