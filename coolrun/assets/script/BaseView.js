// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        hero: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Node, // optional, default is typeof default
        },
        rollBtn:{
            default:null,
            type:cc.Node,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.animation = this.hero.getComponent(cc.Animation);
        
        this.rollBtn.on(cc.Node.EventType.TOUCH_START, this.onRollStart.bind(this), this);
        this.rollBtn.on(cc.Node.EventType.TOUCH_END, this.onRollEnd.bind(this), this);
        this.rollBtn.on(cc.Node.EventType.TOUCH_CANCEL, this.onRollEnd.bind(this), this);

        this.actionUp = cc.moveBy(1,cc.v2(0,100)).easing(cc.easeCubicActionOut());
        this.actionDown = cc.moveBy(1,cc.v2(0,-100)).easing(cc.easeCubicActionIn());
        
        this.onMyPlayAnimation("Run");



    },

    start () {

    },

    onJump(){

        if(this.animation.currentClip.name == "Jump"){
            return;
        };

        let seq = cc.sequence(this.actionUp,this.actionDown,cc.callFunc(this.callback,this));

        this.hero.runAction(seq);
        
        this.onMyPlayAnimation("Jump");
    },


    onMyPlayAnimation(playName){


        if(playName == "Roll"){
            this.hero.y=-108; 
        }else{
            this.hero.y=-92; 
        }
        this.animation.play(playName)

    },
   
    onRollStart(){
        
        this.onMyPlayAnimation("Roll");
        
    },
    onRollEnd(){
        this.onMyPlayAnimation("Run");
    },

    callback:function(){
        console.log("callback");
        
        // this.onMyPlayAnimation();
        this.onMyPlayAnimation("Run");
    },


    // update (dt) {},
});
