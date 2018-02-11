/* 饼图组件对象 */

var H5ComponentPie = function(name, cfg) {
  var component = new H5ComponentBase(name, cfg);

  //  绘制网格线 - 背景层
  var w = cfg.width;
  var h = cfg.height;

  //  加入一个画布（网格线背景）
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = ctx.width = w;
  canvas.height = ctx.height = h;
  $(canvas).css('zIndex', 1);
  component.append(canvas);

  var r = w / 2;

  //  加入一个底图层
  ctx.beginPath();
  ctx.fillStyle = '#eee';
  ctx.strokeStyle = '#eee';
  ctx.lineWidth = 1;
  ctx.arc(r, r, r, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();

  //  绘制一个数据层
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = ctx.width = w;
  canvas.height = ctx.height = h;
  $(canvas).css('zIndex', 2);
  component.append(canvas);

  var colors = ['#EF4136', '#FF7676', '#FFAD69', '#99C0FF', '#5DDBD8']; //  备用颜色

  var sAngel = 1.5 * Math.PI; //  设置开始的角度在 12 点位置
  var eAngel = 0; //  结束角度
  var aAngel = Math.PI * 2; //  100%的圆结束的角度 2pi = 360


  var step = cfg.data.length;
  for (var i = 0; i < step; i++) {

    var item = cfg.data[i];
    var color = item.color || (item.color = colors.pop());

    eAngel = sAngel + aAngel * item.value;

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = .1;

    ctx.moveTo(r, r);
    ctx.arc(r, r, r, sAngel, eAngel);
    ctx.fill();
    ctx.stroke();
    sAngel =eAngel

    //  加入所有的项目文本以及百分比

    var text = $('<div class="text">');
    text.text(cfg.data[i].key);
    var per = $('<div class="per">');
    per.text(cfg.data[i].value * 100 + '%');
    text.append(per);    
    var x = r + Math.sin(Math.PI/2-sAngel) * r;
    var y = r + Math.cos(Math.PI/2-sAngel) * r;


    if (x > w / 2) {
      text.css('left', x / 2);
    } else {
      text.css('right', (w - x) / 2);
    }
    if (y > h / 2) {
      text.css('top', y / 2);
    } else {
      text.css('bottom', (h - y) / 2);
    }
    text.css('opacity', 0);
    component.append(text);

  }

  //  加入一个蒙板层
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = ctx.width = w;
  canvas.height = ctx.height = h;
  $(canvas).css('zIndex', 3);
  component.append(canvas);


  ctx.fillStyle = '#eee';
  ctx.strokeStyle = '#eee';
  ctx.lineWidth = 1;


  //  生长动画

  var draw = function(per) {

    ctx.clearRect(0, 0, w, h);

    ctx.beginPath();

    ctx.moveTo(r, r);

    if (per <= 0) {
      ctx.arc(r, r, r, 0, 2 * Math.PI);
      component.find('.text').css('opacity', 0)
    } else {
      ctx.arc(r, r, r, sAngel, sAngel + 2 * Math.PI * per, true);
    }

    ctx.fill();
    ctx.stroke();

    if (per >= 1) {
      component.find('.text').css('opacity', 1);
      ctx.clearRect(0, 0, w, h);
    }
  }
  draw(0);

  component.on('onLoad', function() {
    //  饼图生长动画
    var s = 0;
    for (i = 0; i < 100; i++) {
      setTimeout(function() {
        s += .01;
        draw(s);
      }, i * 10 + 500);
    }
  });
  component.on('onLeave', function() {
    //  饼图退场动画
    var s = 1;
    for (i = 0; i < 100; i++) {
      setTimeout(function() {
        s -= .01;
        draw(s);
      }, i * 10);
    }
  });

  return component;
}