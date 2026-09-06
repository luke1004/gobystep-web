var myApp = angular.module('showbbs');

myApp.controller('MainController', ['$scope', '$http',
    function ($scope, $http) {
        $scope.message = "hello!!";
        $http.get("messages")
            .then(function (response) {
                $scope.message = response.data;
            });
    }]);

myApp.controller('MessageController', ['$scope', '$http',
    function ($scope, $http) {
        $scope.message = "hello!!";
        $http.get("messages")
            .then(function (response) {
                $scope.message = response.data;
            });
    }]);

myApp.controller('NewMessageController', ['$scope', '$http',
    function ($scope, $http) {
        $scope.message = "hello!";
        $scope.invalidtext = "";
        $scope.clear = function () { $scope.iMessage = ""; };
        $scope.save = function () {
            if ($scope.insert_form.$valid) {
                // Submit as normal
                $http({
                    method: 'post',
                    url: '/messages',
                    data: { iName: $scope.iName, iContact: $scope.iContact, iMessage: $scope.iMessage, iGroup: $scope.iGroup},
                }).then(function (response) {
                    if (response.data) {
                        $scope.invalidtext = "";
                        window.location = "./message";
                    }
                    else {
                        $scope.invalidtext = "Contains illegal characters!"
                    }
                }, function errorCallback(response) {
                });
            } else {
                $scope.insert_form.submitted = true;
            }
        };
    }]);
	
myApp.controller('CarouselDemoCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $scope.photoMessage = "Hello";
        var myCarousel = document.getElementById("myCarousel");
        var video = document.getElementById("shVideo");
        video.addEventListener('ended', function () {
            //this.style.display = 'none';
            $("#myCarousel").carousel('cycle');
            //alert("The End!");
        }, false);
        video.addEventListener('play', function () {
            //this.style.display = 'none';
            //alert("Playing");
            $("#myCarousel").carousel('pause');
        }, false);
        /*$('#myCarousel').on('slid.bs.carousel', function () {     
            var carouselData = $(this).find('.active');
            //alert(carouselData.attr('data-slide-to'));
            $scope.photoMessage = "hello,Liao qiusheng!";
        });*/
        $('#myCarousel').carousel();   //auto slide
        /* 
        $('#carousel-ad').carousel({
            pause: true,
            interval: false
        });*/
        $('#myCarousel').on('slid.bs.carousel', function () {
            var carouselData = $(this).find('.active');
            var id = carouselData.attr('data-slide-to');
            $('#carousel-text').html($('#slide-content-' + id).html());
            //alert(id);
        });
    }]);

    myApp.controller('CarouselDemoCtrl1', ['$scope', '$http',
    function ($scope, $http) {
        $scope.photoMessage = "Hello";
        var myCarousel = document.getElementById("myCarousel");
        //var video = document.getElementById("shVideo");
        /*
        video.addEventListener('ended', function () {
            //this.style.display = 'none';
            $("#myCarousel").carousel('cycle');
            //alert("The End!");
        }, false);
        video.addEventListener('play', function () {
            //this.style.display = 'none';
            //alert("Playing");
            $("#myCarousel").carousel('pause');
        }, false);
        */
        /*$('#myCarousel').on('slid.bs.carousel', function () {     
            var carouselData = $(this).find('.active');
            //alert(carouselData.attr('data-slide-to'));
            $scope.photoMessage = "hello,Liao qiusheng!";
        });*/
        $('#myCarousel').carousel();   //auto slide
        /* 
        $('#carousel-ad').carousel({
            pause: true,
            interval: false
        });*/
        $('#myCarousel').on('slid.bs.carousel', function () {
            var carouselData = $(this).find('.active');
            var id = carouselData.attr('data-slide-to');
            $('#carousel-text').html($('#slide-content-' + id).html());
            //alert(id);
        });
    }]);