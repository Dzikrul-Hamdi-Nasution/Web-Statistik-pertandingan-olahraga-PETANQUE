var config = {
    apiKey: "AIzaSyBmsLRI8AnABG5N43j3q1noOsA4avWtUcs",
    authDomain: "petanque-statistik.firebaseapp.com",
    databaseURL: "https://petanque-statistik-default-rtdb.firebaseio.com/",
    projectId: "petanque-statistik",
    storageBucket: "petanque-statistik.appspot.com",
    messagingSenderId: "202978980820",
    appId: "1:202978980820:web:e1698d5c702c2b709ddc41",
    measurementId: "G-V4Q2KS4KG9"

 
  };
  firebase.initializeApp(config);
  

  var ronde_ke;
  var lapangan_ke;
  
  
  $(document).ready(function() {


    
  


  });

  function tampil_data(){
    alert("Menampilkan Ronde "+ronde.value+" di Lapangan " +lapangan.value )
    ronde_ke=ronde.value;
    lapangan_ke=lapangan.value;
    cek_parameter_match();
    cek_skor();
    cek_persen();

   
  }

  function tampil_final(){
    alert("Menampilkan Statistil Final di Lapangan " +lapangan.value )
    lapangan_ke=lapangan.value;
    ronde_ke=ronde.value;
    var messagesRef = firebase.database();

    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("logo_a");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("logo_a").src =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("logo_b");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("logo_b").src =data;
        });
    })
    
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("team_a_name");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("team_a_name").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("team_b_name");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("team_b_name").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("match_number");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("match_number").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("field_number");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("field_number").innerHTML =data;
        });
    })
    
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("arbitre_1");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("arbitre_1").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("arbitre_2");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("arbitre_2").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("waktu");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("waktu").innerHTML =data;
        });
    })
    document.getElementById("round_number").innerHTML ="FINAL";
    
    for (let z = 1; z <= 10; z++) {

        var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("data_final").child("skor_a_"+z);
        ref.on("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                data = childSnapshot.val();
                console.log(data);
                document.getElementById("skor_a_"+z).innerHTML =data;
            });
        })
        var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("data_final").child("persen_a_"+z);
        ref.on("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                data = childSnapshot.val();
                console.log(data);
                document.getElementById("persen_a_"+z).innerHTML =data;
            });
        })
        var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("data_final").child("skor_b_"+z);
        ref.on("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                data = childSnapshot.val();
                console.log(data);
                document.getElementById("skor_b_"+z).innerHTML =data;
            });
        })
        var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("data_final").child("persen_b_"+z);
        ref.on("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                data = childSnapshot.val();
                console.log(data);
                document.getElementById("persen_b_"+z).innerHTML =data;
            });
        })


        
       }
       var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("data_final").child("skor_a_11");
        ref.on("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                data = childSnapshot.val();
                console.log(data);
                document.getElementById("skor_a_11").innerHTML =data;
            });
        })
        var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("data_final").child("skor_b_11");
        ref.on("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                data = childSnapshot.val();
                console.log(data);
                document.getElementById("skor_b_11").innerHTML =data;
            });
        })
      
        document.getElementById("round_number").innerHTML ="FINAL";
  }



  function cek_skor(){

    var messagesRef = firebase.database();

    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("logo_a");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("logo_a").src =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("logo_b");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("logo_b").src =data;
        });
    })

    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("skor_a_1");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("skor_a_1").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("skor_a_2");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("skor_a_2").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("skor_a_3");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("skor_a_3").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("skor_a_4");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("skor_a_4").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("skor_a_5");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("skor_a_5").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("skor_a_6");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("skor_a_6").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("skor_a_7");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("skor_a_7").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("skor_a_8");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("skor_a_8").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("skor_a_9");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("skor_a_9").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("skor_a_10");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("skor_a_10").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("skor_a_11");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("skor_a_11").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("skor_b_1");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("skor_b_1").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("skor_b_1");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("skor_b_1").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("skor_b_2");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("skor_b_2").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("skor_b_3");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("skor_b_3").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("skor_b_4");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("skor_b_4").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("skor_b_5");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("skor_b_5").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("skor_b_6");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("skor_b_6").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("skor_b_7");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("skor_b_7").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("skor_b_8");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("skor_b_8").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("skor_b_9");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("skor_b_9").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("skor_b_10");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("skor_b_10").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("skor_b_11");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("skor_b_11").innerHTML =data;
        });
    })




  }


  function cek_persen(){
    var messagesRef = firebase.database();
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("persen_a_1");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("persen_a_1").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("persen_a_2");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("persen_a_2").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("persen_a_3");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("persen_a_3").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("persen_a_4");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("persen_a_4").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("persen_a_5");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("persen_a_5").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("persen_a_6");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("persen_a_6").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("persen_a_7");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("persen_a_7").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("persen_a_8");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("persen_a_8").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("persen_a_9");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("persen_a_9").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("persen_a_10");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("persen_a_10").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("persen_a_11");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("persen_a_11").innerHTML =data;
        });
    })


    var messagesRef = firebase.database();
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("persen_b_1");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("persen_b_1").innerHTML =data;
        });
    })
    var messagesRef = firebase.database();
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("persen_b_2");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("persen_b_2").innerHTML =data;
        });
    })
    var messagesRef = firebase.database();
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("persen_b_3");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("persen_b_3").innerHTML =data;
        });
    })
    var messagesRef = firebase.database();
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("persen_b_4");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("persen_b_4").innerHTML =data;
        });
    })
    var messagesRef = firebase.database();
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("persen_b_5");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("persen_b_5").innerHTML =data;
        });
    })
    var messagesRef = firebase.database();
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("persen_b_6");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("persen_b_6").innerHTML =data;
        });
    })
    var messagesRef = firebase.database();
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("persen_b_7");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("persen_b_7").innerHTML =data;
        });
    })
    var messagesRef = firebase.database();
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("persen_b_8");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("persen_b_8").innerHTML =data;
        });
    })
    var messagesRef = firebase.database();
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("persen_b_9");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("persen_b_9").innerHTML =data;
        });
    })
    var messagesRef = firebase.database();
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("persen_b_10");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("persen_b_10").innerHTML =data;
        });
    })
    var messagesRef = firebase.database();
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("persen_b_11");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("persen_b_11").innerHTML =data;
        });
    })

}








  function cek_parameter_match(){
    var messagesRef = firebase.database();
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("round_number");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("round_number").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("team_a_name");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("team_a_name").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("team_b_name");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("team_b_name").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("match_number");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("match_number").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("field_number");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("field_number").innerHTML =data;
        });
    })
    
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("arbitre_1");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("arbitre_1").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("arbitre_2");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("arbitre_2").innerHTML =data;
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+lapangan_ke).child("ronde_"+ronde_ke).child("waktu");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            console.log(data);
            document.getElementById("waktu").innerHTML =data;
        });
    })
  }
  
 