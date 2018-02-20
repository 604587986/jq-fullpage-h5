var H5 = function() {
  this.id = ('h5-' + Math.random()).replace('.', '-');
  this.el = $('<div class="h5"> id="' + this.id + '"').hide();
  this.pageArr = [];
  $('body').append(this.el);
  this.addPage = function(name) {
    var page = $('<div class="h5-page section">');
    name && page.addClass('h5-page-' + name);
    this.el.append(page);
    this.pageArr.push(page);
    return this;
  }
  this.addComponent = function(name, cfg) {
    var cfg = cfg || {};
    cfg = $.extend({
      type: 'base'
    }, cfg);
    var component;
    var page = this.pageArr.slice(-1)[0];
    switch (cfg.type) {
      case 'base':
        component = new H5ComponentBase(name, cfg);
        break;
      case 'point':
        component = new H5ComponentPoint(name, cfg);
        break;
      case 'bar':
        component = new H5ComponentBar(name, cfg);
        break;
      case 'polyline':
        component = new H5ComponentPolyline(name, cfg);
        break;
      case 'radar':
        component = new H5ComponentRadar(name, cfg);
        break;
      case 'pie':
        component = new H5ComponentPie(name, cfg);
        break;
      case 'bar-col':
        component = new H5ComponentBar_col(name, cfg);
        break;
    }
    page.append(component)
    return this;
  }
  this.loader = function() {
    this.el.show().fullpage({
      onLeave: function(index, nextIndex, direction) {
        $(this).find('.h5-component').trigger('onLeave');
      },
      afterLoad: function(anchorLink, index) {
        $(this).find('.h5-component').trigger('onLoad');
      }
    })
  }
}