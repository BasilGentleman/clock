Page({
  width:null,
  heigth:null,
  timer:null,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: res => {
        
        this.width = res.windowWidth
        this.heigth = res.windowHeight
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var ctx = wx.createCanvasContext('myCanvas')
    var width = this.width
    var heigth = this.heigth
    var radius = width/2 -30  
    var D6 = 6 * Math.PI / 180
    var D30 = 30 * Math.PI / 180
    var D90 = 90 * Math.PI  / 180 
    draw()
    this.timer = setInterval(draw,1000);

    function draw(){
      //将窗口中心设为坐标原点 
      ctx.translate(width/2,heigth/2)
      //绘制表盘
      drawClock(ctx,radius)
      //绘制指针
      drawHand(ctx,radius)
      //执行绘画
      ctx.draw()
    }

    //绘制表盘部分
    function drawClock(ctx,radius){
      //绘制大圆
      ctx.setLineWidth(2)
      ctx.beginPath() //开始一个新的路径
      ctx.arc(0,0,radius,0,2*Math.PI,true)
      ctx.stroke() //画线
      //绘制中心圆
      ctx.setLineWidth(1)
      ctx.beginPath() //开始一个新的路径
      ctx.arc(0,0,9,0,2*Math.PI,true)
      ctx.stroke()  //画线

      //绘制大表盘刻度线,线条粗细为5px
      ctx.setLineWidth(5)
      for (let i = 0 ; i < 12 ; i++) {
        //每次刻度旋转30°
        ctx.rotate(D30)
        ctx.beginPath() //开始一个新的路径
        ctx.moveTo(radius,0)
        ctx.lineTo(radius - 15,0)
        ctx.stroke()  //画线
      }
      //绘制小刻度线，线条粗细为1px
      ctx.setLineWidth(1)
      for (let i = 0 ; i < 60 ; i++) {
        //每次刻度旋转30°
        ctx.rotate(D6)
        ctx.beginPath() //开始一个新的路径
        ctx.moveTo(radius,0)
        ctx.lineTo(radius - 10,0)
        ctx.stroke()  //画线
      }
      //绘制文本
      ctx.setFontSize(20)
      //计算文本距离表盘中心的半径
      var r = radius - 30
      for ( let i = 1 ; i <= 12 ; i++ ) {
        var x = r * Math.cos(D30*i - D90)
        var y = r * Math.sin(D30*i - D90)
        if ( i >= 10 ) {
          ctx.fillText(i,x-12,y+5)
        } else {
          ctx.fillText(i,x-6,y+5)
        }
      }
    }
    //绘制指针 
    function drawHand(ctx,radius){
        //获取当前时间
    var now = new Date()
    var h = now.getHours()
    var m = now.getMinutes()
    var s = now.getSeconds()
    h = h > 12 ? h - 12 : h
    //时间从3点开始，逆时针旋转90°，使指针指向12点
    ctx.rotate(-D90)
    ctx.save()  //保存旋转状态
    //绘制时针
    ctx.rotate(D30 * (h + m/60 + s/3600))
    ctx.setLineWidth(6)
    ctx.beginPath() //开始一个新的路径
    ctx.moveTo(-20,0)
    ctx.lineTo(radius / 2.6,0)
    ctx.stroke()

    //绘制分针
    ctx.restore()  //恢复旋转状态，使指针指向12点
    ctx.rotate(D6 * ( m + s/60))
    ctx.setLineWidth(4)
    ctx.beginPath() //开始一个新的路径
    ctx.moveTo(-20,0)
    ctx.lineTo(radius / 1.8,0)
    ctx.stroke()

    //绘制秒针
    ctx.restore()  //恢复旋转状态，使指针指向12点
    ctx.rotate(D6 * s)
    ctx.setLineWidth(2)
    ctx.beginPath() //开始一个新的路径
    ctx.moveTo(-20,0)
    ctx.lineTo(radius / 1.5,0)
    ctx.stroke()
    }
  
  }
}) 