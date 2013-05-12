/****************************************************************
*****************************************************************
****	Class of Javascript Document for jQuery              ****
*****************************************************************
****    Powered by Christophe Tasserie                       ****
****    Designed by Christophe Tasserie                      ****
****                                                         ****
****    Copyright © 2011 - All rights reserved               ****
****                                                         ****
****    M. Tasserie Christophe                               ****
****                                                         ****
****    48 Chemin des autrichiens                            ****
****    06600 Antibes                                        ****
****    France                                               ****
****                                                         ****
****    +33 622 256 941                                      ****
****    christophe@tasserie.fr                               ****
****    http://tasserie.fr                                   ****
*****************************************************************
****************************************************************/

/****************************************************************
*****************************************************************
****	Repository is counterBox                             ****
*****************************************************************
****************************************************************/


(function($){
	$.fn.extend({
		counterBox:function(value, options, duration, easing, callback){
			/****************************************************************
			****	Variables                                            ****
			****************************************************************/
			var _options;
			var _value = value;
			var _duration = duration;
			var _easing = easing;
			var _callback = callback;
			var _divBox;
			var _hiddenValue;
			var setValue = function(item, value){
				if(isNaN(value)==false){_value=parseInt(value);}
				else{_value=0;}
				if(_value>_options.maxValue){_value=_options.maxValue;}
				init(item);
			}
			var setValueMax = function(item, value){
				_options.maxValue=value;
				$.each($(item).children(),function(){
					if($(this).attr("type")!="hidden"){$(this).remove();}
				});
				createBox(item);
				createNumber(_divBox);
				createLastNumber(item);
				setValue(item,_value);
			}
			var gotoValue = function(item, value, callback){
				var _speed=value-$($(item).find("input")).val();
				_value=value;
				var mycallback=callback;
				if(!callback){mycallback=null;}
				var array = new Array();
				var hNumber=_options.numberHeight/2;
				var start=_options.numberStart;
				if(_value>_options.maxValue){
					if(_options.repeat==true){_value=0;}
					else{_value=_options.maxValue;}
				}
				$($(item).find("input")).val(_value);
				if(_value.toString().length>=1){array=_value.toString().split('');}
				else{array=new Array(_options.numberStart);}
				if(array.length<=_options.maxValue.toString().length){
					$box=$(item).children()[1];
					for(i=1;i<=(_options.maxValue.toString().length-array.length);i++){
						var number=_options.numberStart;
						$column=$($($box).children()[i]).children()[0];
						var columnBox=$($($column).children()[0]).height();
						var top=((number*hNumber)-(hNumber/2))+columnBox;
						if(parseInt($($column).attr("value"))>number){$($column).animate({top:-(top-(hNumber*_speed))+"px"},0);}
						$($column).animate({top:-top+"px"},_duration,_easing);
						$($column).attr("value",number);
					}
					for(i=1;i<array.length;i++){
						var nRoll=_options.maxValue.toString().length-i;
						var nArray=array.length-(i+1);
						var number=array[nArray]-start;
						$column=$($($box).children()[nRoll]).children()[0];
						var columnBox=$($($column).children()[0]).height();
						var top=((number*hNumber)-(hNumber/2))+columnBox;
						if(parseInt($($column).attr("value"))>number){$($column).animate({top:-(top-(hNumber*_speed))+"px"},0);}
						$($column).animate({top:-top+"px"},_duration,_easing);
						$($column).attr("value",number);
					}
					var nRoll=_options.maxValue.toString().length;
					var nArray=array.length-1;
					var number=array[nArray]-start;
					$column=$($($box).children()[nRoll]).children()[0];
					var columnBox=$($($column).children()[0]).height();
					var top=((number*hNumber)-(hNumber/2))+columnBox;
					if(parseInt($($column).attr("value"))>number){$($column).animate({top:-(top-(hNumber*_speed))+"px"},0);}
					$($column).animate({top:-top+"px"},_duration,_easing,function(callback){
						if(mycallback!=null){
							if(_value<_options.maxValue){mycallback();}
							else if(_value==_options.maxValue){
								if(_callback!=null){_callback();}
								if(_options.repeat==true){mycallback();}
							}
						}
					});
					$($column).attr("value",number);
				}
			}
			var gotoLessValue = function(item, value, callback){
				var _speed=$($(item).find("input")).val()-value;
				_value=value;
				var mycallback=callback;
				if(!callback){mycallback=null;}
				var array = new Array();
				var hNumber=_options.numberHeight/2;
				var start=_options.numberStart;
				if(_value<0){
					if(_options.repeat==true){_value=_options.maxValue;}
					else{_value=0;}
				}
				$($(item).find("input")).val(_value);
				if(_value.toString().length>=1){array=_value.toString().split('');}
				else{array=new Array(_options.numberStart);}
				if(array.length<=_options.maxValue.toString().length){
					$box=$(item).children()[1];
					for(i=1;i<=(_options.maxValue.toString().length-array.length);i++){
						var number=_options.numberStart;
						$column=$($($box).children()[i]).children()[0];
						var columnBox=$($($column).children()[0]).height();
						var top=((number*hNumber)-(hNumber/2))+columnBox;
						if(parseInt($($column).attr("value"))<number){$($column).animate({top:-(top+(hNumber*_speed))+"px"},0);}
						$($column).animate({top:-top+"px"},_duration,_easing);
						$($column).attr("value",number);
					}
					for(i=1;i<array.length;i++){
						var nRoll=_options.maxValue.toString().length-i;
						var nArray=array.length-(i+1);
						var number=array[nArray]-start;
						$column=$($($box).children()[nRoll]).children()[0];
						var columnBox=$($($column).children()[0]).height();
						var top=((number*hNumber)-(hNumber/2))+columnBox;
						if(parseInt($($column).attr("value"))<number){$($column).animate({top:-(top+(hNumber*_speed))+"px"},0);}
						$($column).animate({top:-top+"px"},_duration,_easing);
						$($column).attr("value",number);
					}
					var nRoll=_options.maxValue.toString().length;
					var nArray=array.length-1;
					var number=array[nArray]-start;
					$column=$($($box).children()[nRoll]).children()[0];
					var columnBox=$($($column).children()[0]).height();
					var top=((number*hNumber)-(hNumber/2))+columnBox;
					if(parseInt($($column).attr("value"))<number){$($column).animate({top:-(top+(hNumber*_speed))+"px"},0);}
					$($column).animate({top:-top+"px"},_duration,_easing,function(callback){
						if(mycallback!=null){
							if(_value>0){mycallback();}
							else if(_value==0){
								if(_callback!=null){_callback();}
								if(_options.repeat==true){mycallback();}
							}
							
						}
					});
					$($column).attr("value",number);
				}
			}
			if(!_value){_value=0;}
			if(!duration){_duration=1000;}
			if(!easing){_easing="linear";}
			if(!callback){_callback=null;}
			/****************************************************************
			****	Extend Otions counterBox                             ****
			****************************************************************/
			_options = $.extend({
			  numberStart:0,                                     //Number for start. Do not modify
			  numberStop:9,                                      //Number for stop. Do not modify
			  maxValue:9,                                        //Max value
			  numberRoll:2,                                      //Number of roll. Do not modify
			  borderWidth:2,                                     //Width border
			  innerWidth:0,                                      //Width inner border
			  numberWidth:20,                                    //Width roll
			  numberHeight:60,                                   //Height roll
			  percentShadowRoll:50,                              //Height shadow roll
			  xShadowBox:"0px",                                  //Postion horizontal shadow box
			  yShadowBox:"0px",                                  //Postion vertical shadow box
			  blurShadowBox:"5px",                               //Blur shadow box
			  spreadShadowBox:"0px",                             //Spread shadow box
			  shadowBox:true,                                    //Enable shadow box
			  colorFrom:"rgba(96,96,96,1)",                      //Color from box
			  colorTo:"rgba(248,248,248,1)",                     //Color to box
			  colorRoll:"rgba(255,0,255,1)",                     //Background color roll
			  colorShadowRollFrom:"rgba(0,0,0,0.8)",             //Color from shadow roll
			  colorShadowRollTo:"rgba(255,255,255,0)",           //Color to shadow roll
			  colorShadowBox:"rgba(0,0,0,0.8)",                  //Color shadow box
			  colorText:"rgba(0,0,0,1)",                         //Color text
			  background:"rgba(255,255,255,1)",                  //Background
			  repeat:false,                                       //Mode repeat
			}, options);
			if(_value>_options.maxValue){_value=_options.maxValue;}
			_hiddenValue=document.createElement("input");
			$(_hiddenValue).attr("type","hidden");
			$(_hiddenValue).val(_value);
			$(this).append(_hiddenValue);
			createBox(this);
			createNumber(_divBox);
			createLastNumber(this);
			init(this);
			/****************************************************************
			****	Extend Function counterBox                           ****
			****************************************************************/
			$.fn.extend({
				setValue:function(value){setValue($(this), value);},
				setValueMax:function(value){setValueMax($(this), value);},
				setOptions:function(value){
					if(value.numberStart){_options.numberStart=value.numberStart;}
					if(value.numberStop){_options.numberStop=value.numberStop;}
					if(value.maxValue){_options.maxValue=value.maxValue;}
					if(value.numberRoll){_options.numberRoll=value.numberRoll;}
					if(value.borderWidth){_options.borderWidth=value.borderWidth;}
					if(value.innerWidth){_options.innerWidth=value.innerWidth;}
					if(value.numberWidth){_options.numberWidth=value.numberWidth;}
					if(value.numberHeight){_options.numberHeight=value.numberHeight;}
					if(value.percentShadowRoll){_options.percentShadowRoll=value.percentShadowRoll;}
					if(value.xShadowBox){_options.xShadowBox=value.xShadowBox;}
					if(value.yShadowBox){_options.yShadowBox=value.yShadowBox;}
					if(value.blurShadowBox){_options.blurShadowBox=value.blurShadowBox;}
					if(value.spreadShadowBox){_options.spreadShadowBox=value.spreadShadowBox;}
					if(value.shadowBox){_options.shadowBox=value.shadowBox;}
					if(value.colorFrom){_options.colorFrom=value.colorFrom;}
					if(value.colorTo){_options.colorTo=value.colorTo;}
					if(value.colorRoll){_options.colorRoll=value.colorRoll;}
					if(value.colorShadowRollFrom){_options.colorShadowRollFrom=value.colorShadowRollFrom;}
					if(value.colorShadowRollTo){_options.colorShadowRollTo=value.colorShadowRollTo;}
					if(value.colorShadowBox){_options.colorShadowBox=value.colorShadowBox;}
					if(value.colorText){_options.colorText=value.colorText;}
					if(value.background){_options.background=value.background;}
					if(value.repeat){_options.repeat=value.repeat;}
				},
				getValue:function(){return $($(this).find("input")).val();},
				getValueMax:function(){return _options.maxValue;},
				getOptions:function(){return _options;},
				gotoValue:function(value, callback){gotoValue($(this), value, callback);},
				addTick:function(value, callback){gotoValue($(this), parseInt($($(this).find("input")).val())+value, callback);},
				removeTick:function(value, callback){gotoLessValue($(this), parseInt($($(this).find("input")).val())-value, callback);},
				getId:function(){return $(this).attr("id");}
			});
			return this;
			function createBox(item){
				/**********************************************
				****    Variables                          ****
				**********************************************/
				var nRoll=_options.maxValue.toString().length;
				var pShadowRoll=_options.percentShadowRoll/100;
				//----    Largeur    ----//
				var wBorder=_options.borderWidth;
				var wInner=_options.innerWidth;
				var wNumber=_options.numberWidth;
				var wBox=(wBorder*2)+((wInner*nRoll)-wInner)+(wNumber*nRoll)
				//-----------------------//
				//----    Height     ----//
				var hNumber=_options.numberHeight;
				var hBox=((wBorder*2)+hNumber);
				var hRoll=wBorder+hNumber;
				//-----------------------//
				//----    Shadow     ----//
				var xShadowBox=_options.xShadowBox
				var yShadowBox=_options.yShadowBox
				var blurShadowBox=_options.blurShadowBox
				var spreadShadowBox=_options.spreadShadowBox
				//-----------------------//
				//----    Color      ----//
				var cStart=_options.colorFrom;
				var cStop=_options.colorTo;
				var cShadowBox=_options.colorShadowBox;
				var cShadowRollFrom=_options.colorShadowRollFrom;
				var cShadowRollTo=_options.colorShadowRollTo;
				var cBackground=_options.background;
				//-----------------------//
				//-----------------------//
				//-----------------------//
				_divBox=document.createElement("div");
				$divFront=document.createElement("div");
				$canvas=document.createElement("canvas");
				//-----------------------//
				$($canvas).attr("width",wBox);
				$($canvas).attr("height",hBox);
				$($divFront).append($canvas);
				$($divFront).attr("class","box_timer");
				$(_divBox).append($divFront);
				$(item).append(_divBox);
				var shadowBox="";
				if(_options.shadowBox==true){shadowBox="box-shadow:"+xShadowBox+" "+yShadowBox+" "+blurShadowBox+" "+spreadShadowBox+" "+cShadowBox+";";}
				$(item).attr("style","width:"+wBox+"px;height:"+hBox+"px;");
				$(_divBox).attr("style","position:relative;width:"+wBox+"px;height:"+hBox+"px;background:"+cBackground+";"+shadowBox+"z-index:9999");
				/**********************************************
				****    Create roll                        ****
				**********************************************/
				for(iRoll=0;iRoll<nRoll;iRoll++){
					var shadowLeft=$canvas.getContext("2d");
					var gradientLeft=shadowLeft.createLinearGradient(0,wBorder,0,hRoll);
					gradientLeft.addColorStop(0,cShadowRollFrom);
					gradientLeft.addColorStop(pShadowRoll,cShadowRollTo);
					gradientLeft.addColorStop(pShadowRoll,cShadowRollTo);
					gradientLeft.addColorStop(1,cShadowRollFrom);
					shadowLeft.fillStyle=gradientLeft;
					shadowLeft.fillRect(wBorder+((wInner*iRoll)+(wNumber*iRoll)),wBorder,wNumber,hNumber);    //----    (x,y,width,height)    ----//
				}
				/**********************************************
				****    Create top border                  ****
				**********************************************/
				var borderTop=$canvas.getContext("2d");
				borderTop.fillStyle=cStart;
				borderTop.fillRect(0,0,wBox,wBorder);
				/**********************************************
				****    Create right border                ****
				**********************************************/
				var borderRight=$canvas.getContext("2d");
				var gradientBorderRight=borderRight.createLinearGradient(0,wBorder,0,hRoll);
				gradientBorderRight.addColorStop(0,cStart);
				gradientBorderRight.addColorStop(0.5,cStop);
				gradientBorderRight.addColorStop(1,cStart);
				borderRight.fillStyle=gradientBorderRight;
				borderRight.fillRect(wBox-wBorder,wBorder,wBorder,hNumber);
				/**********************************************
				****    Create bottom border               ****
				**********************************************/
				var borderBottom=$canvas.getContext("2d");
				borderTop.fillStyle=cStart;
				borderTop.fillRect(0,(wBorder+hNumber),wBox,wBorder);
				/**********************************************
				****    Create left border                 ****
				**********************************************/
				var borderLeft=$canvas.getContext("2d");
				var gradientBorderLeft=borderLeft.createLinearGradient(0,wBorder,0,hRoll);
				gradientBorderLeft.addColorStop(0,cStart);
				gradientBorderLeft.addColorStop(0.5,cStop);
				gradientBorderLeft.addColorStop(1,cStart);
				borderLeft.fillStyle=gradientBorderLeft;
				borderLeft.fillRect(0,wBorder,wBorder,hNumber);
				/**********************************************
				****    Create inner border                ****
				**********************************************/
				if(wInner>0){
					for(iInner=1;iInner<nRoll;iInner++){
						var borderMiddle=$canvas.getContext("2d");
						var gradientBorderMiddle=borderMiddle.createLinearGradient(0,wInner,0,hRoll);
						gradientBorderMiddle.addColorStop(0,cStart);
						gradientBorderMiddle.addColorStop(0.5,cStop);
						gradientBorderMiddle.addColorStop(1,cStart);
						borderMiddle.fillStyle=gradientBorderMiddle;
						borderMiddle.fillRect(wBorder+((wNumber*iInner)+(wInner*iInner)-wInner),wBorder,wInner,hNumber);
					}
				}
			}
			function createNumber(item){
				/**********************************************
				****    Variables                          ****
				**********************************************/
				var nRoll=_options.maxValue.toString().length;
				for(iRoll=0;iRoll<nRoll;iRoll++){
					var nNumber=0;
					var start=_options.numberStart;
					var stop=_options.numberStop;
					var wInner=_options.innerWidth;
					var wNumber=_options.numberWidth;
					var hNumber=_options.numberHeight/2;
					var hBox=_options.numberHeight;
					var wBorder=_options.borderWidth;
					var cText=_options.colorText;
					for(n=start;n<=stop;n++){nNumber=n-start;}
					var yBox=-(nNumber*hNumber)-(hNumber/2)-wBorder;
					var lBox=wBorder+(wNumber*iRoll)+(wInner*iRoll)
					var fontSize=parseInt((hNumber*85)/100)
					//-----------------------//
					//-----------------------//
					//-----------------------//
					if(start<=stop){
						$divMaskBoxNumber=document.createElement("div");
						$($divMaskBoxNumber).attr("id","maskBox"+iRoll);
						$($divMaskBoxNumber).attr("style", "top:"+wBorder+"px;left:"+lBox+"px;width:"+wNumber+"px;height:"+hBox+"px;");
						$($divMaskBoxNumber).attr("class", "box_timer-number-mask");
			
						$divBoxNumber=document.createElement("div");
						$($divBoxNumber).attr("id","columnBox"+iRoll);
						$($divBoxNumber).attr("style", "width:"+wNumber+"px;top:"+yBox+"px;");
						$($divBoxNumber).attr("value",0);
						$($divBoxNumber).attr("class", "box_timer-number-column");
						for(iBox=0;iBox<3;iBox++){
							$divRowNumber=document.createElement("div");
							$($divRowNumber).attr("id","rowBox"+iBox);
							$($divRowNumber).attr("style", "width:"+wNumber+"px");
							$($divRowNumber).attr("class", "box_timer-number-row");
							for(i=start;i<=stop;i++){
								$divNumber=document.createElement("div");
								$spanNumber=document.createElement("span");
								$($divNumber).attr("id","Number"+i);
								$($divNumber).attr("style","width:"+wNumber+"px;height:"+hNumber+"px;");
								$($divNumber).attr("class", "box_timer-number");
								$($spanNumber).attr("style","width:"+wNumber+"px;height:"+hNumber+"px;color:"+cText+";font-size:"+fontSize+"px;");
								$($spanNumber).attr("class", "box_timer-number-inner");
								$($divNumber).append($spanNumber);
								$($divRowNumber).append($divNumber);
								/**********************************************
								****    Create number                      ****
								**********************************************/
								$($spanNumber).html(i);
							}
							$($divBoxNumber).append($divRowNumber);
						}
						$($divMaskBoxNumber).append($divBoxNumber);
						$(item).append($divMaskBoxNumber);
					}
				}
			}
			function createLastNumber(item){
				var nMax=parseInt(_options.maxValue.toString().substr(0,1));
				$box=$(item).children()[1];
				$column=$($($box).children()[1]).children()[0];
				for(i=0;i<3;i++){
					$row=$($column).children()[i];
					for(iMax=0;iMax<=_options.numberStop;iMax++){
						if(iMax>nMax){$($($row).children()[iMax]).hide();}
						else{$($($row).children()[iMax]).show();}
					}
				}
			}
			function init(item){
				var array = new Array();
				var hNumber=_options.numberHeight/2;
				var start=_options.numberStart;
				var nRoll=_options.maxValue.toString().length;
				if(_value.toString().length>=1){array=_value.toString().split('');}
				else{array=new Array(_options.numberStart);}
				$($(item).find("input")).val(_value);
				if(array.length<=nRoll){
					$box=$(item).children()[1];
					for(i=1;i<=_options.maxValue.toString().length;i++){
						var number=_options.numberStart;
						$column=$($($box).children()[i]).children()[0];
						var columnBox=$($($column).children()[0]).height();
						var top=((number*hNumber)-(hNumber/2))+columnBox;
						$($column).css({top:-top+"px"});
						$($column).attr("value",number);
					}
					var nArray=0;
					for(i=(_options.maxValue.toString().length-array.length);i<=_options.maxValue.toString().length;i++){
						var nRoll=i+1;
						var number=array[nArray];
						$column=$($($box).children()[nRoll]).children()[0];
						var columnBox=$($($column).children()[0]).height();
						var top=((number*hNumber)-(hNumber/2))+columnBox;
						$($column).css({top:-top+"px"});
						$($column).attr("value",number);
						nArray++;
					}
				}
			}
		}
	});
})(jQuery);
