angular.module("starter.controllers",[])



.controller('myPos',function ($scope,$cordovaGeolocation,$ionicPlatform,$http,$ionicPopup,$ionicLoading,$cordovaNativeAudio,$cordovaSQLite,$rootScope,dbModule) {
  // body...

 function showMap(coords) {
 	// body...

// kif n3Aytelha hna traja undefined normalement traja3 tab fih 24 obj
 	
 	


 	//lhna mch mawjouda ? tab mawjouda mochkla fi enou ya3ml console.log w ba3d ynik mlwa7da lokhra zidha callbacl
 
//******** sound var *******//
 	    var soundEffect={};
 	
 	soundEffect.press="cartoon015.mp3";
 	soundEffect.succsses="sucsess.mp3";
 	soundEffect.err="cartoon048.mp3";
 	soundEffect.loopsound="loopsound.mp3";
 	

 	  $cordovaNativeAudio.preloadSimple('loopSound', 'songeffect/'+soundEffect.loopsound);
      $cordovaNativeAudio.preloadSimple('preSound', 'songeffect/'+soundEffect.press);
      $cordovaNativeAudio.preloadSimple('succsses', 'songeffect/'+soundEffect.succsses);
      $cordovaNativeAudio.preloadSimple('err', 'songeffect/'+soundEffect.err);
//******** sound var ********//

//******************************** get My country ************************************** //
 	$http.post("http://maps.googleapis.com/maps/api/geocode/json?latlng="+coords.latitude+","+coords.longitude+"&language=ar&sensor=true").
 	then(function(response) {

 		var addrComponents= response.data.results;
 		function getCountry(addrComponents) {

 			for (var i = 0; i < addrComponents.length; i++) {
        		if (addrComponents[i].types[0] == "country") {
            		return [addrComponents[i].long_name, addrComponents[i].short_name];
        		}
        		if (addrComponents[i].types.length == 2) {
            		if (addrComponents[i].types[0] == "political") {
                		return addrComponents[i].long_name;
            		}
        		}
    		}
    		return false;
		}

	var mycountry= getCountry(response.data.results[0].address_components);

	var shortName = mycountry[1];
	var longName = mycountry[0];
	
//******************************** get My country ************************************** //

//******************************** get My position and make the marker ************************************** //

 	var mapOption={
 		center:{lat:coords.latitude,lng:coords.longitude},
 		zoom:10,
 		mapTypeId: google.maps.MapTypeId.ROADMAP,
 	};

 	var map= new google.maps.Map(document.getElementById('map'),mapOption);

 	
 	 var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h4 id="firstHeading" class="firstHeading">مرحبا بك في اعرف العالم.</h4>'+
      '<div id="bodyContent">'+
      '<p>اضغط على المؤشرات التي تظهر في الخريطة و استمتع بالاجابة على الاسئلة.</p>' +
    	'<p>ملاحظة: هذه اللعبة يمكنك ان تلعب فقط في البلاد التونسية في انتظار التحديث الجديد.<p>'+
      '<p>حضا موفقا.</p>'+
     
      '</div>'+
      '</div>';

      var infoWindow = new google.maps.InfoWindow({
		content: contentString,
		maxWidth: 200

		});

 	var startmarker = new google.maps.Marker({
 		id:0,
 		position: {lat:coords.latitude,lng:coords.longitude},
 		map: map,
 		title: 'My position',
 		
  	});

  	infoWindow.open(map,startmarker);

//******************************** get My position and make the marker ************************************** //

 	


//******************************** get My position and make the marker ************************************** //  	
$cordovaNativeAudio.loop('loopSound');
//******************************** add clik action for my position ************************************** //
if(shortName=="TN"){

	

 		var coutry= dbModule.getCountryTunisia(function(country) {
 		
 		
 		var villNumber=country.length;
		
	startmarker.addListener("click",function(){
		
		
    $cordovaNativeAudio.play('preSound');
     $scope.fuck={};
    	 var myPopup = $ionicPopup.show({
     title: 'ما هو عدد الولايات في '+ longName+'؟',
     template: '<input type="number" ng-model="fuck.rep">',
     scope: $scope,
      buttons: [
     
      {
        text: '<b>حفظ الاجابة</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.fuck.rep) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            return $scope.fuck.rep;
          }
        }
      }
    ]
   });

  myPopup.then(function(res) {
    
  
      
		

if (res==villNumber){

		$scope.score=0;
		$scope.fouls=0;
			$cordovaNativeAudio.play('succsses');
			var succssesPopup = $ionicPopup.alert({
			 	 title: 'احسنت اجابة صائبة',
			     
			 });
			 
			var villmarkers=1;
			var rep=[];
			var result={};
				result.fouls=0;
				result.score=0;
				
			map.setZoom(7);
			map.setCenter();

			dbModule.getqestionTunisia(function(qst) {

				for (i = 0; i < country.length; i++) {
  		 		
      			var data =country[i];

      			

      			latLng = new google.maps.LatLng(data.lat, data.lon);
      			
		    	var villmarker = new google.maps.Marker({
		    		position: latLng,
		    		map: map,
		    		title: data.titel
		  		});
		  		(function(villmarker, data) {
				// Attaching a click event to the current marker

				var q=qst[i];

				//console.log(q);b
				google.maps.event.addListener(villmarker, "click", function(e) {

					$cordovaNativeAudio.play('preSound');
      			
					$scope.choice = {};
					var myPopup = $ionicPopup.show({
					    template: '<ion-list radio-group [(ngModel)]="relationship">'+
					     '<ion-radio ng-model="choice.r" ng-value="1" >'+q.possibilite1+'</ion-radio>'+
					     '<ion-radio ng-model="choice.r" ng-value="2" >'+q.possibilite2+'</ion-radio>'+
					     '<ion-radio ng-model="choice.r" ng-value="3" >'+q.possibilite3+'</ion-radio>'+
					     '</ion-list>',
					    title: data.titel,
					    subTitle: '<h4>'+q.question+'</h4>',
					    scope: $scope,
					    buttons: [
					      { text: 'إلغاء' },
					      {
					        text: '<b>حفظ الاجابة</b>',
					        type: 'button-positive',
					        onTap: function(e) {
							console.log($scope.choice);
					        	
					          if ($scope.choice.r==q.reponse) {
					          
					            //e.preventDefault();
					            $cordovaNativeAudio.play('succsses');
								var succssesPopup = $ionicPopup.alert({
								 	 title: 'احسنت اجابة صائبة',
								    
								 });
			       
					             
					             rep.push(data);
					             console.log(rep);
					            
					            villmarker.setMap(null);

					          
					          } else {
					           	$cordovaNativeAudio.play('err');

								 var foulsePopup = $ionicPopup.alert({
								 	 title: 'خطأ حاول من جديد',
								    
								 });
					           
					            myPopup.close();

					            result.fouls=result.fouls+1;
					            e.preventDefault();


					          }
					          
					        }
					      }
					    ]
					  });

					  myPopup.then(function(res) {
					    //console.log('Tapped!', res);
					    //console.log(rep.length);
					    var markersArray=[];
					    for (var i = 0; i < rep.length; i++) {
					    	var data= rep[i];
					    	//console.log(data);
					    	latLng = new google.maps.LatLng(data.lat, data.lon);
			      			//console.log(data.titel); 
					    	var villmarker = new google.maps.Marker({
					    		position: latLng,
					    		map: map,
					    		title: data.titel,
					    		icon:'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
					  		});
					  		 (function(villmarker, data) {
								// Attaching a click event to the current marker
								google.maps.event.addListener(villmarker, "click", function(e) {
									 var contentString = '<div id="content">'+
								      '<div id="siteNotice">'+
								      '</div>'+
								      '<h4 id="firstHeading" class="firstHeading">مرحبا بك في '+data.titel+'.</h4>'+
								      '<div id="bodyContent">'+
								      '<p>'+data.info+'</p>' +
								    
								      '<p>حضا موفقا.</p>'+
								     
								      '</div>'+
								      '</div>';

								      var infoWindow = new google.maps.InfoWindow({
										content: contentString,
										maxWidth: 200

										});
									
									infoWindow.open(map, villmarker);
								});
							})(villmarker, data);
					    }
					  		 	
						      

					    result.score=rep.length;
					   $scope.score=result.score;
						$scope.fouls=result.fouls;
					    //console.log(result);
					    dbModule.insertScore(result);

					    if(rep.length==country.length){//country.length
					    	$scope.sa={};
					    	 var gg = $ionicPopup.show({
							    template: '<input type="text" ng-model="sa.s">',
							    title: 'غادر البلاد عبر هذا اللغز:',
							    subTitle: 'علي نحوه من أمو و دفنوه دفنت لغبينا بعد ما مات صبح يدور فالمدينة؟',
							    scope: $scope,
							    buttons: [
							      
							      {
							        text: '<b>حفظ الاجابة</b>',
							        type: 'button-positive',
							        onTap: function(e) {
							          if (!$scope.sa.s) {
							            //don't allow the user to close unless he enters wifi password
							            e.preventDefault();
							          } else {
							            return $scope.sa.s;
							          }
							        }
							      }
							    ]
							  });

							  gg.then(function(res) {
							  	
							    if (res=='الفحم'){

							    	var succssesalert=$cordovaNativeAudio.play('succsses');
							    	  $ionicPopup.alert({

								 	 title: 'احسنت اجابة صائبة',
								 	 subTitle: 'مبروك لقد اكملت المرحلة الاولى. انتظرنا في التحديث القادم لاستكشاف بقية العالم العربي.',
								    
								 });
							    }else{

									var foulsealert=$cordovaNativeAudio.play('err');

								 	 $ionicPopup.alert({
								 	 title: 'خطأ حاول من جديد',
								    	 
								 	});
								 	location.reload();
								}
							  });
					    }

					  });
					  

				});
			})(villmarker, data);
		    }
			});

			

		
		}else{

			$cordovaNativeAudio.play('err');
			villmarkers=0;

			 var foulsePopup = $ionicPopup.alert({
			 	 title: 'خطأ حاول من جديد',
			    
			 });
		}

		
//********* delete my postion marker ***** //
		if(villmarkers==1){

			startmarker.setMap(null);

		}
//********* delete my postion marker ***** //
});
    })
		
    });

    
 	
 	
 }
});
 		
 	}
 //******************************** add clik action for my position ************************************** //

 var posOptions = {timeout: 3000, enableHighAccuracy: true};
 $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {

 	$scope.coords= position.coords;
    showMap(position.coords);

}, function(err) {

	console.log(err);
    switch(err.code) {
    	case 1:
        alert("خطأ في النظام. تأكد من تفعيل ال GPS و الانترنت، ثم اعد تشغيل اللعبة.");
        navigator.app.exitApp();
        break;
        case 2:
        alert("خطأ في النظام. تأكد من تفعيل ال GPS و الانترنت، ثم اعد تشغيل اللعبة.");
        navigator.app.exitApp();
        break;
        case 3:
        alert("خطأ في النظام. تأكد من تفعيل ال GPS و الانترنت، ثم اعد تشغيل اللعبة.");
        navigator.app.exitApp();
        break;
      }
    });
 
})
