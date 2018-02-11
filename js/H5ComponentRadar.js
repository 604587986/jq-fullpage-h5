var H5ComponentRadar = function(name, cfg) {
  var component = new H5ComponentBase(name, cfg);

  var w = cfg.width;
  var h = cfg.height;
  //第一层画布
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = ctx.width = w;
  canvas.height = ctx.height = h;
  component.append(canvas)
    //开始绘制雷达背景
  var step = cfg.data.length;
  var r = w / 2;

  //半径为r，圆心为（r，r），弧度为rad = 2pi/step，则x=r+r*sin(rad),y=r+r*cos(rad)
  var flag = false;
  for (var s = step; s > 0; s--) {
    ctx.beginPath();
    for (var i = 0; i < step; i++) {
      var rad = 2 * Math.PI / step * i;
      var x = r + r * (s / step) * Math.sin(rad)
      var y = r + r * (s / step) * Math.cos(rad)
      ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.fillStyle = (flag = !flag) ? '#99C0FF' : '#F1F9FF'
    ctx.fill();
  }
  // 绘制伞骨图
  for (var i = 0; i < step; i++) {
    var rad = 2 * Math.PI / step * i;
    var x = r + r * Math.sin(rad)
    var y = r + r * Math.cos(rad)
    ctx.moveTo(r, r);
    ctx.lineTo(x, y);
    var text = $('<div class="key">' + cfg.data[i].key + '</div>');
    if (x > r) {
      text.css({ left: x / 2 })
    } else if (x === r) {
      text.css({ left: x / 2 - 6 })
    } else {
      text.css({ right: (w - x) / 2 })
    }
    if (y > r) {
      text.css({ top: y / 2 + 'px' })
    } else {
      text.css({ bottom: (h - y) / 2 + 'px' })
    }
    component.append(text)
  }
  ctx.lineWidth = 3
  ctx.strokeStyle = '#E0E0E0';
  ctx.stroke()
    //第二层画布
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = ctx.width = w;
  canvas.height = ctx.height = h;
  component.append(canvas)
    /**
     * 
     * @param {per} per 用于调整图表高度，完成动画效果
     */
  ctx.font = "16px normal";
  var draw = function(per) {
    ctx.clearRect(0, 0, w, h)
      //开始绘制数据线
    ctx.strokeStyle = '#FF7676'
    ctx.lineWidth = 3
    for (var i = 0; i < step; i++) {
      var rate = cfg.data[i].value*per
      var rad = 2 * Math.PI / step * i;
      var x = r + r * rate * Math.sin(rad)
      var y = r + r * rate * Math.cos(rad)
      ctx.lineTo(x, y);
    }
    ctx.closePath()
    ctx.stroke();
    //开始绘制数据点
    ctx.fillStyle = '#FF7676'
    for (var i = 0; i < step; i++) {
      var rate = cfg.data[i].value*per
      var rad = 2 * Math.PI / step * i;
      var x = r + r * rate * Math.sin(rad)
      var y = r + r * rate * Math.cos(rad)
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI)
      ctx.fill();
    }
    //开始绘制值
    ctx.fillStyle = 'rgba(79,79,79,' + per + ')'
    for (var i = 0; i < step; i++) {
      var rate = cfg.data[i].value
      var rad = 2 * Math.PI / step * i;
      var x = r + r * rate * Math.sin(rad)
      var y = r + r * rate * Math.cos(rad)
      ctx.fillText(cfg.data[i].value * 100 + '%', x + 5, y - 5)
    }
  }
  component.on('onLoad', function() {
    //载入动画
    var per = 0;
    for (i = 0; i < 100; i++) {
      setTimeout(function() {
        per += 0.01
        draw(per)
      }, i * 10)
    }
  });
  component.on('onLeave', function() {
    //载出动画
    var per = 1;
    for (i = 0; i < 100; i++) {
      setTimeout(function() {
        per -= 0.01
        draw(per)
      }, i * 10)
    }
  });

  return component;
}