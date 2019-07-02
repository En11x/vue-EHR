//封装一个点击，滚动条调到指定地方的方法
// 主页回到顶部按钮会用到，文章目录点击跳到文章具体位置
var timer = null
var scroll = {
    methods: {
        //target传入的是距离顶部的距离
        scrollToTarget(target,animation = true){
            if(!animation){
                //不使用动画，点击直接调到target。没有过度效果
                document.documentElement.scrollTop = document.body.scrollTop = 0
                return
            }
            //使用动画
            //获取当前的scrollTop
            let crruentTop = document.documentElement.scrollTop || document.body.scrollTop
            let t = 0
            let dir = 1
            if(crruentTop<target) dir = -1
            timer = setInterval(() => {
                t++
                //匀加速运动
                crruentTop -= 2*t*dir 
                document.documentElement.scrollTop = document.body.scrollTop = crruentTop
                if((dir==1&&crruentTop<=target)||(dir==-1&&crruentTop>=target)){
                    document.documentElement.scrollTop = document.body.scrollTop = target
                    // 清除定时器
                    clearInterval(timer)
                }
            }, 16.7);
        }
    }
}

export default scroll