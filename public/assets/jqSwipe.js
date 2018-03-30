!function(e){e.event.special.swipe={setup:function(){e(this).bind("touchstart",e.event.special.swipe.handler)},teardown:function(){e(this).unbind("touchstart",e.event.special.swipe.handler)},handler:function(t){function n(){p.removeEventListener("touchmove",i),a=s=null}function i(i){i.preventDefault()
var u=a-i.touches[0].pageX,r=s-i.touches[0].pageY
return Math.abs(u)>=20?(n(),h=u>0?-1:1):Math.abs(r)>=20&&(n(),c=r>0?1:-1),t.type="swipe",o.unshift(t,h,c),(e.event.dispatch||e.event.handle).apply(p,o)}var a,s,o=[].slice.call(arguments,1),u=t.originalEvent.touches,h=0,c=0,p=this
t=e.event.fix(t),1==u.length&&(a=u[0].pageX,s=u[0].pageY,this.addEventListener("touchmove",i,!1))}}}(window.jQuery||window.Zepto)
