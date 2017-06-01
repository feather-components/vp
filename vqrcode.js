;
(function(factory) {
    if (typeof module === 'object' && typeof module.exports == 'object') {
        module.exports = factory(
            require('vue'),require('vue-components/vdialog'),require('qrcode')
        );
    } else {
        window.Vqrcode=factory(window.Vue,window.Vdialog,window.QRCode);
    }
})(function(Vue,Vdialog,QRCode) {
    var vQrcode={};
    vQrcode.install = function(Vue) { 
        Vue.component('vqrcode',{  
            template: '<vdialog ref="dialog" :option="dialogoption"><div id="qrImg" style="width:120px;margin:auto"></div></vdialog>',
            methods: {
                open: function(url,name) { 
                    var _this=this;   
                    this.createQRcode(url);
                    this.$refs.dialog.open().then(function(index){ 
                        _this.download(name);
                    },function(){}); 
                },
                createQRcode: function(url) {
                    if (this.oQrcode) {
                        this.oQrcode.clear();
                        this.oQrcode.makeCode(url); 
                    } else {
                        this.oQrcode = new QRCode(document.getElementById("qrImg"), {
                            text: url,
                            width: 120,
                            height: 120,
                            colorDark: "#000000",
                            colorLight: "#ffffff",
                            render: 'canvas'
                        });
                    }
                },
                download:function(qrname){
                    var myCanvas = document.getElementById("qrImg").getElementsByTagName('canvas')[0];
                    var image = myCanvas.toDataURL("image/png");
                    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
                    save_link.href = image;
                    save_link.download = qrname + '.png';
                    var event = document.createEvent('MouseEvents');
                    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    save_link.dispatchEvent(event);
                } 
            },
            data:function (argument) { 
                return { 
                    dialogoption:{
                        title:'二维码',
                        btns:[{
                            name:'下载'
                        }]
                    },
                    oQrcode:null
                }
            } 
        }) 
    }
    Vue.use(vQrcode);
    return vQrcode;
});
