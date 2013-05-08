/****************************************************************
*****************************************************************
****  Class of Javascript Document for jQuery              ****
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
		counterBox:function(options, value, duration, easing, callback){
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
				//var nRoll=_options.numberMax.toString().length; //_options.numberRoll
				//if(_value.toString().length>nRoll){_value=parseInt(_value.toString().substring(0,nRoll));}
				if(_value>_options.numberMax){_value=_options.numberMax;}
				init(item);
			}
			var setValueMax = function(item, value){
				_options.numberMax=value;
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
				if(_value>_options.numberMax){
					if(_options.repeat==true){_value=0;}
					else{_value=_options.numberMax;}
				}
				$($(item).find("input")).val(_value);
				if(_value.toString().length>=1){array=_value.toString().split('');}
				else{array=new Array(_options.numberStart);}
				if(array.length<=_options.numberMax.toString().length){
					$box=$(item).children()[1];
					for(i=1;i<=(_options.numberMax.toString().length-array.length);i++){
						var number=_options.numberStart;
						$column=$($($box).children()[i]).children()[0];
						var columnBox=$($($column).children()[0]).height();
						var top=((number*hNumber)-(hNumber/2))+columnBox;
						if(parseInt($($column).attr("value"))>number){$($column).animate({top:-(top-(hNumber*_speed))+"px"},0);}
						$($column).animate({top:-top+"px"},_duration,_easing);
						$($column).attr("value",number);
					}
					for(i=1;i<array.length;i++){
						var nRoll=_options.numberMax.toString().length-i; //_options.numberRoll
						var nArray=array.length-(i+1);
						var number=array[nArray]-start;
						$column=$($($box).children()[nRoll]).children()[0];
						var columnBox=$($($column).children()[0]).height();
						var top=((number*hNumber)-(hNumber/2))+columnBox;
						if(parseInt($($column).attr("value"))>number){$($column).animate({top:-(top-(hNumber*_speed))+"px"},0);}
						$($column).animate({top:-top+"px"},_duration,_easing);
						$($column).attr("value",number);
					}
					var nRoll=_options.numberMax.toString().length; //_options.numberRoll
					var nArray=array.length-1;
					var number=array[nArray]-start;
					$column=$($($box).children()[nRoll]).children()[0];
					var columnBox=$($($column).children()[0]).height();
					var top=((number*hNumber)-(hNumber/2))+columnBox;
					if(parseInt($($column).attr("value"))>number){$($column).animate({top:-(top-(hNumber*_speed))+"px"},0);}
					$($column).animate({top:-top+"px"},_duration,_easing,function(callback){
						if(mycallback!=null){
							if(_value<_options.numberMax){mycallback();}
							else if(_value==_options.numberMax){
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
					if(_options.repeat==true){_value=_options.numberMax;}
					else{_value=0;}
				}
				$($(item).find("input")).val(_value);
				if(_value.toString().length>=1){array=_value.toString().split('');}
				else{array=new Array(_options.numberStart);}
				if(array.length<=_options.numberMax.toString().length){
					$box=$(item).children()[1];
					for(i=1;i<=(_options.numberMax.toString().length-array.length);i++){
						var number=_options.numberStart;
						$column=$($($box).children()[i]).children()[0];
						var columnBox=$($($column).children()[0]).height();
						var top=((number*hNumber)-(hNumber/2))+columnBox;
						if(parseInt($($column).attr("value"))<number){$($column).animate({top:-(top+(hNumber*_speed))+"px"},0);}
						$($column).animate({top:-top+"px"},_duration,_easing);
						$($column).attr("value",number);
					}
					for(i=1;i<array.length;i++){
						var nRoll=_options.numberMax.toString().length-i; //_options.numberRoll
						var nArray=array.length-(i+1);
						var number=array[nArray]-start;
						$column=$($($box).children()[nRoll]).children()[0];
						var columnBox=$($($column).children()[0]).height();
						var top=((number*hNumber)-(hNumber/2))+columnBox;
						if(parseInt($($column).attr("value"))<number){$($column).animate({top:-(top+(hNumber*_speed))+"px"},0);}
						$($column).animate({top:-top+"px"},_duration,_easing);
						$($column).attr("value",number);
					}
					var nRoll=_options.numberMax.toString().length; //_options.numberRoll
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
			
			_options = $.extend({
			  numberStart:0,
			  numberStop:9,
			  numberMax:9,
			  numberRoll:2,
			  borderWidth:2,
			  innerWidth:0,
			  numberWidth:20,
			  numberHeight:60,
			  percentShadowRoll:50,
			  xShadowBox:"0px",
			  yShadowBox:"0px",
			  blurShadowBox:"5px",
			  spreadShadowBox:"0px",
			  shadowBox:true,
			  colorStart:"rgba(96,96,96,1)",
			  colorStop:"rgba(248,248,248,1)",
			  colorRoll:"rgba(255,0,255,1)",
			  colorShadowRoll:"rgba(0,0,0,0.8)",
			  colorShadowBox:"rgba(0,0,0,0.8)",
			  colorText:"rgba(0,0,0,1)",
			  colorBackground:"rgba(255,255,255,1)",
			  repeat:true,
			}, options);
			
			if(_value>_options.numberMax){_value=_options.numberMax;}
			_hiddenValue=document.createElement("input");
			$(_hiddenValue).attr("type","hidden");
			$(_hiddenValue).val(_value);
			$(this).append(_hiddenValue);
			
			createBox(this);
			createNumber(_divBox);
			createLastNumber(this);
			init(this);
			
			$.fn.extend({
				setValue:function(value){setValue($(this), value);},
				setValueMax:function(value){setValueMax($(this), value);},
				setOptions:function(value){
					alert(value.repeat);
					if(value.numberStart){_options.numberStart=value.numberStart;}
					if(value.numberStop){_options.numberStop=value.numberStop;}
					if(value.numberMax){_options.numberMax=value.numberMax;}
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
					if(value.colorStart){_options.colorStart=value.colorStart;}
					if(value.colorStop){_options.colorStop=value.colorStop;}
					if(value.colorRoll){_options.colorRoll=value.colorRoll;}
					if(value.colorShadowRoll){_options.colorShadowRoll=value.colorShadowRoll;}
					if(value.colorShadowBox){_options.colorShadowBox=value.colorShadowBox;}
					if(value.colorText){_options.colorText=value.colorText;}
					if(value.colorBackground){_options.colorBackground=value.colorBackground;}
					if(value.repeat){_options.repeat=value.repeat;}
				},
				getValue:function(){return $($(this).find("input")).val();},
				getValueMax:function(){return _options.numberMax;},
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
				var nRoll=_options.numberMax.toString().length; //_options.numberRoll
				var pShadowRoll=_options.percentShadowRoll/100;
				//----    Largeur    ----//
				var wBorder=_options.borderWidth;
				var wInner=_options.innerWidth;
				var wNumber=_options.numberWidth;
				var wBox=(wBorder*2)+((wInner*nRoll)-wInner)+(wNumber*nRoll)
				//-----------------------//
				//----    Hauteur    ----//
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
				//----    Couleur    ----//
				var cStart=_options.colorStart;
				var cStop=_options.colorStop;
				var cShadowBox=_options.colorShadowBox;
				var cShadowRoll=_options.colorShadowRoll;
				var cBackground=_options.colorBackground;
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
				****    Création des rouleaux              ****
				**********************************************/
				for(iRoll=0;iRoll<nRoll;iRoll++){
					var shadowLeft=$canvas.getContext("2d");
					var gradientLeft=shadowLeft.createLinearGradient(0,wBorder,0,hRoll);
					gradientLeft.addColorStop(0,cShadowRoll);
					gradientLeft.addColorStop(pShadowRoll,"rgba(255,255,255,0)");
					gradientLeft.addColorStop(pShadowRoll,"rgba(255,255,255,0)");
					gradientLeft.addColorStop(1,cShadowRoll);
					shadowLeft.fillStyle=gradientLeft;
					shadowLeft.fillRect(wBorder+((wInner*iRoll)+(wNumber*iRoll)),wBorder,wNumber,hNumber);    //----    (x,y,width,height)    ----//
				}
				/**********************************************
				****    Création du cadre du haut          ****
				**********************************************/
				var borderTop=$canvas.getContext("2d");
				borderTop.fillStyle=cStart;
				borderTop.fillRect(0,0,wBox,wBorder);
				/**********************************************
				****    Création du cadre du droite        ****
				**********************************************/
				var borderRight=$canvas.getContext("2d");
				var gradientBorderRight=borderRight.createLinearGradient(0,wBorder,0,hRoll);
				gradientBorderRight.addColorStop(0,cStart);
				gradientBorderRight.addColorStop(0.5,cStop);
				gradientBorderRight.addColorStop(1,cStart);
				borderRight.fillStyle=gradientBorderRight;
				borderRight.fillRect(wBox-wBorder,wBorder,wBorder,hNumber);
				/**********************************************
				****    Création du cadre du bas           ****
				**********************************************/
				var borderBottom=$canvas.getContext("2d");
				borderTop.fillStyle=cStart;
				borderTop.fillRect(0,(wBorder+hNumber),wBox,wBorder);
				/**********************************************
				****    Création du cadre du gauche        ****
				**********************************************/
				var borderLeft=$canvas.getContext("2d");
				var gradientBorderLeft=borderLeft.createLinearGradient(0,wBorder,0,hRoll);
				gradientBorderLeft.addColorStop(0,cStart);
				gradientBorderLeft.addColorStop(0.5,cStop);
				gradientBorderLeft.addColorStop(1,cStart);
				borderLeft.fillStyle=gradientBorderLeft;
				borderLeft.fillRect(0,wBorder,wBorder,hNumber);
				/**********************************************
				****    Création du cadre du millieu       ****
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
				var nRoll=_options.numberMax.toString().length; //_options.numberRoll
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
								****    Création de l'ombre gauche         ****
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
				var nMax=parseInt(_options.numberMax.toString().substr(0,1));
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
				var nRoll=_options.numberMax.toString().length; //_options.numberRoll
				if(_value.toString().length>=1){array=_value.toString().split('');}
				else{array=new Array(_options.numberStart);}
				$($(item).find("input")).val(_value);
				if(array.length<=nRoll){
					$box=$(item).children()[1];
					for(i=1;i<=_options.numberMax.toString().length;i++){
						var number=_options.numberStart;
						$column=$($($box).children()[i]).children()[0];
						var columnBox=$($($column).children()[0]).height();
						var top=((number*hNumber)-(hNumber/2))+columnBox;
						$($column).css({top:-top+"px"});
						$($column).attr("value",number);
					}
					var nArray=0;
					for(i=(_options.numberMax.toString().length-array.length);i<=array.length;i++){
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
