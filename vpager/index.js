;
(function(factory) {
    if (typeof module === 'object' && typeof module.exports == 'object') {
        module.exports = factory(
            require('vue')
        );
    } else {
        factory(window.Vue);
    }
})(function(Vue) {
    var vPager = {},template; 
    if(typeof __inline=='undefined'){   
        template = document.getElementById('template').innerHTML;  
    }
    else{
        template=__inline('index.tpl');
    }
    vPager.install = function(Vue) {
        Vue.component('vpager', {
            props: ['model', 'callback','position'],
            template: template,
            methods: {
                to: function(page,disable) {
                    if(disable)
                        return; 
                    if(isNaN(Number(page))){
                        alert('别任性~');
                        this.shortcut='';
                        return;
                    }
                    if(Number(page)>this.pager.page) 
                        page=this.pager.page; 
                    if(Number(page)<1)
                        page=1;
                    this.pager.cur = page;
                    this.calc(this.pager, page);
                    this.callback && this.callback(page); 
                    this.shortcut='';
                },
                calc: function(pager, cur) {
                    cur=Number(cur);
                    start = 2, end = pager.page - 1;
                    if (pager.page > 10) {
                        if (cur - 3 > 1) {
                            start = cur - 3;
                            if (cur + 4 - pager.page < 0) {
                                end = cur + 4
                            } else {
                                start = end - 7;
                            }
                        } else {
                            end = start + 7;
                        }
                    }
                    else if(start>end){
                        end=1;
                    }
                    pager.start = start;
                    pager.end = end;
                    console.log(start,end);
                },
                select:function (size) { 
                    this.pager.page=Math.ceil(this.model.total / size);
                    this.to(1);
                }
            },
            data: function() {
                var option=this.model.option?this.model.option:[10, 20, 50]; 
                var size=option.indexOf(this.model.size)>=0?this.model.size:option[0];
                var pager = {
                    page: Math.ceil(this.model.total / size),
                    size: size,
                    total: this.model.total,
                    cur: this.model.cur,
                    option: option
                };
                this.calc(pager, pager.cur);
                return {
                    pager: pager,
                    shortcut: ''
                }
            },
            watch: {
                // data: function(val, oldVal) {  
                //     if(this.data[0])
                //         this.selected = this.defaultVal!=undefined ? this.defaultVal:this.data[0].val;
                // }
            }
        })
    }
    Vue.use(vPager);
});
