var firebaseConfig = {
  apiKey: "AIzaSyBmsLRI8AnABG5N43j3q1noOsA4avWtUcs",
  authDomain: "petanque-statistik.firebaseapp.com",
  databaseURL: "https://petanque-statistik-default-rtdb.firebaseio.com/",
  projectId: "petanque-statistik",
  storageBucket: "petanque-statistik.appspot.com",
  messagingSenderId: "202978980820",
  appId: "1:202978980820:web:e1698d5c702c2b709ddc41",
  measurementId: "G-V4Q2KS4KG9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      // User is signed in.
     
     
  } else {
      // No user is signed in.
      window.location.replace("index.html")
  }
});







  
var  Match_NUMBER,url_b,url_a;
var files = [];
var files2 = [];
let jumlah_ronde_db;

document.getElementById("files_gambar_a").addEventListener("change", function(e) {
  files = e.target.files;
  for (let i = 0; i < files.length; i++) {
    console.log(files[i]);
  }
});

document.getElementById("files_gambar_b").addEventListener("change", function(e) {
  files2 = e.target.files;
  for (let i = 0; i < files2.length; i++) {
    console.log(files2[i]);
  }
});

function keluar() {
  alert("Anda telah Logout")
  firebase.auth().signOut();
  window.location.replace("index.html")
}

 
  $(document).ready(function(){

  
        
  
  });

  function submit_data(){
    

    ronde = document.getElementById("ronde_skore").value;
    document.getElementById("round_number").innerHTML =ronde;
    field_number = document.getElementById("field_number").value;
    document.getElementById("field_number_a").innerHTML =field_number;
    if (files.length != 0) {
      for (let i = 0; i < files.length; i++) {
        var storage = firebase.storage().ref(files[i].name);
        var upload = storage.put(files[i]);
        upload.on(
          "state_changed",
          function progress(snapshot) {
            var percentage =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            
          },
          //https://firebasestorage.googleapis.com/v0/b/petanque-statistik.appspot.com/o/logo_a?alt=media&token=d0eddb85-ad0b-4b75-894b-b59af9e559de
          //https://firebasestorage.googleapis.com/v0/b/petanque-statistik.appspot.com/o/logo_a?alt=media&token=426244f0-4809-4989-858f-744e2a0c96fd
          function error() {
            alert("Gagal Upload Gambar");
          },
          function complete() {
            var storage = firebase.storage().ref(files[i].name);
            storage
              .getDownloadURL()
              .then(function(url_a) {
              
              firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("logo_a").update({
                nilai:url_a,
             });
             document.getElementById("logo_a").src =url_a;

              })
          }
        );
      }
    }
    if (files2.length != 0) {
      for (let i = 0; i < files2.length; i++) {
        var storage = firebase.storage().ref(files2[i].name);
        var upload = storage.put(files2[i]);
        upload.on(
          "state_changed",
          function progress(snapshot) {
            var percentage =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;        
          },
           function error() {
            alert("Gagal Upload Gambar");
          },
          function complete() {
            var storage = firebase.storage().ref(files2[i].name);
            storage
              .getDownloadURL()
              .then(function(url_b) {
              
              firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("logo_b").update({
                nilai:url_b,
             });
             document.getElementById("logo_b").src =url_b;
              })
          }
        );
      }
    }

    if(list_match_number.value==0){
      Match_NUMBER = "SINGLE";
      document.getElementById("match_number").innerHTML =Match_NUMBER;
    }
    if(list_match_number.value==1){
      Match_NUMBER = "DOUBLE";
      document.getElementById("match_number").innerHTML =Match_NUMBER;
    }
    if(list_match_number.value==2){
      Match_NUMBER = "TRIPLE";
      document.getElementById("match_number").innerHTML =Match_NUMBER;
    }

   
    
    arbitre_1 = document.getElementById("arbitre_1").value;
    document.getElementById("arbitre_1_a").innerHTML =arbitre_1;
    arbitre_2 = document.getElementById("arbitre_2").value;
    document.getElementById("arbitre_2_a").innerHTML =arbitre_2;
    waktu = document.getElementById("waktu").value;
    document.getElementById("waktu_a").innerHTML =waktu;

    var messagesRef = firebase.database();
    
    field_number = document.getElementById("field_number").value;
    var ref = messagesRef.ref("game").child("lapangan_"+field_number).child("jumlah_ronde");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            jumlah_ronde_db= parseInt(data);
        });
    })

    
    nama_team_b = document.getElementById("nama_team_b").value;
    document.getElementById("team_b_name").innerHTML =nama_team_b;
    nama_team_a = document.getElementById("nama_team_a").value;
    document.getElementById("team_a_name").innerHTML =nama_team_a;

    firebase.database().ref("game").child("lapangan_"+field_number).child("jumlah_ronde").update({
      nilai: ronde,
    });

          firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("team_a_name").update({
            nilai: nama_team_a,
          });
          firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("team_b_name").update({
            nilai: nama_team_b,
          });
          firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("match_number").update({
            nilai: Match_NUMBER,
          });
          firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("field_number").update({
            nilai: field_number,
          });
          firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("arbitre_1").update({
            nilai: arbitre_1,
          });
          firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("arbitre_2").update({
            nilai: arbitre_2,
          });
          firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("waktu").update({
            nilai: waktu,
          });
          firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("round_number").update({//////////////////ini diambil
            nilai: ronde,
          });
          firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_"+ronde).update({//////////////////ini diambil
            round_number: ronde,
          });
          alert("Data Permainan Berhasil Di Update")
  }


  function clear_data(){
    $("#nama_team_a").val("");
    $("#nama_team_b").val("");
    $("#field_number").val("");
    $("#arbitre_1").val("");
    $("#arbitre_2").val("");
    $("#waktu").val("");
    $("#ronde_skore").val("");
  }

  function clear_data_statistik(){
    $("#score_a_1").val("");
    $("#score_a_2").val("");
    $("#score_a_3").val("");
    $("#score_a_4").val("");
    $("#score_a_5").val("");
    $("#score_a_6").val("");
    $("#score_a_7").val("");
    $("#score_a_8").val("");
    $("#score_a_9").val("");
    $("#score_a_10").val("");
    $("#final_score_a").val("");

    $("#score_b_1").val("");
    $("#score_b_2").val("");
    $("#score_b_3").val("");
    $("#score_b_4").val("");
    $("#score_b_5").val("");
    $("#score_b_6").val("");
    $("#score_b_7").val("");
    $("#score_b_8").val("");
    $("#score_b_9").val("");
    $("#score_b_10").val("");
    $("#final_score_b").val("");

  }

  function submit_data_statistik(){
    

    score_a_1 = document.getElementById("score_a_1").value;
    document.getElementById("skor_a_1").innerHTML =score_a_1;
    score_a_2 = document.getElementById("score_a_2").value;
    document.getElementById("skor_a_2").innerHTML =score_a_2;
    score_a_3 = document.getElementById("score_a_3").value;
    document.getElementById("skor_a_3").innerHTML =score_a_3;
    score_a_4 = document.getElementById("score_a_4").value;
    document.getElementById("skor_a_4").innerHTML =score_a_4;
    score_a_5 = document.getElementById("score_a_5").value;
    document.getElementById("skor_a_5").innerHTML =score_a_5;
    score_a_6 = document.getElementById("score_a_6").value;
    document.getElementById("skor_a_6").innerHTML =score_a_6;
    score_a_7 = document.getElementById("score_a_7").value;
    document.getElementById("skor_a_7").innerHTML =score_a_7;
    score_a_8 = document.getElementById("score_a_8").value;
    document.getElementById("skor_a_8").innerHTML =score_a_8;
    score_a_9 = document.getElementById("score_a_9").value;
    document.getElementById("skor_a_9").innerHTML =score_a_9;
    score_a_10 = document.getElementById("score_a_10").value;
    document.getElementById("skor_a_10").innerHTML =score_a_10;
    final_score_a = document.getElementById("final_score_a").value;
    document.getElementById("skor_a_11").innerHTML =final_score_a;

    score_b_1 = document.getElementById("score_b_1").value;
    document.getElementById("skor_b_1").innerHTML =score_b_1;
    score_b_2 = document.getElementById("score_b_2").value;
    document.getElementById("skor_b_2").innerHTML =score_b_2;
    score_b_3 = document.getElementById("score_b_3").value;
    document.getElementById("skor_b_3").innerHTML =score_b_3;
    score_b_4 = document.getElementById("score_b_4").value;
    document.getElementById("skor_b_4").innerHTML =score_b_4;
    score_b_5 = document.getElementById("score_b_5").value;
    document.getElementById("skor_b_5").innerHTML =score_b_5;
    score_b_6 = document.getElementById("score_b_6").value;
    document.getElementById("skor_b_6").innerHTML =score_b_6;
    score_b_7 = document.getElementById("score_b_7").value;
    document.getElementById("skor_b_7").innerHTML =score_b_7;
    score_b_8 = document.getElementById("score_b_8").value;
    document.getElementById("skor_b_8").innerHTML =score_b_8;
    score_b_9 = document.getElementById("score_b_9").value;
    document.getElementById("skor_b_9").innerHTML =score_b_9;
    score_b_10 = document.getElementById("score_b_10").value;
    document.getElementById("skor_b_10").innerHTML =score_b_10;
    final_score_b = document.getElementById("final_score_b").value;
    document.getElementById("skor_b_11").innerHTML =final_score_b;

    if(list_match_number.value==0){
      Match_NUMBER = "SINGLE";
      persen_a_1 = (score_a_1/3*100).toFixed(1)+"%";
      document.getElementById("persen_a_1").innerHTML =persen_a_1;
      persen_a_3 = (score_a_3/3*100).toFixed(1)+"%";
      document.getElementById("persen_a_3").innerHTML =persen_a_3;
      
      persen_b_1 = (score_b_1/3*100).toFixed(1)+"%";
      document.getElementById("persen_b_1").innerHTML =persen_b_1;
      persen_b_3 = (score_b_3/3*100).toFixed(1)+"%";
      document.getElementById("persen_b_3").innerHTML =persen_b_3;
    }
    if(list_match_number.value==1){
      Match_NUMBER = "DOUBLE";
      persen_a_1 = (score_a_1/6*100).toFixed(1)+"%";
      ocument.getElementById("persen_a_1").innerHTML =persen_a_1;
      persen_a_3 = (score_a_3/6*100).toFixed(1)+"%";
      document.getElementById("persen_a_3").innerHTML =persen_a_3;

      persen_b_1 = (score_b_1/6*100).toFixed(1)+"%";
      document.getElementById("persen_b_1").innerHTML =persen_b_1;
      persen_b_3 = (score_b_3/6*100).toFixed(1)+"%";
      document.getElementById("persen_b_3").innerHTML =persen_b_3;
    }
    if(list_match_number.value==2){
      Match_NUMBER = "TRIPLE";
      persen_a_1 = (score_a_1/6*100).toFixed(1)+"%";
      document.getElementById("persen_a_1").innerHTML =persen_a_1;
      persen_a_3 = (score_a_3/6*100).toFixed(1)+"%";
      document.getElementById("persen_a_3").innerHTML =persen_a_3;

      persen_b_1 = (score_b_1/6*100).toFixed(1)+"%";
      document.getElementById("persen_b_1").innerHTML =persen_b_1;
      persen_b_3 = (score_b_3/6*100).toFixed(1)+"%";
      document.getElementById("persen_b_3").innerHTML =persen_b_3;
    }
    
    persen_a_2 = (score_a_2/(parseInt(score_a_2)+parseInt(score_b_2))*100).toFixed(1)+"%";
    if(persen_a_2 =="NaN%" ){
      persen_a_2="0%"
    }
    document.getElementById("persen_a_2").innerHTML =persen_a_2;
    persen_a_4 = (score_a_4/(parseInt(score_a_4)+parseInt(score_b_4))*100).toFixed(1)+"%";
    if(persen_a_4 =="NaN%" ){
      persen_a_4="0%"
    }
    document.getElementById("persen_a_4").innerHTML =persen_a_4;
    persen_a_5 = (score_a_5/(parseInt(score_a_5)+parseInt(score_b_5))*100).toFixed(1)+"%";
    if(persen_a_5 =="NaN%" ){
      persen_a_5="0%"
    }
    document.getElementById("persen_a_5").innerHTML =persen_a_5;
    persen_a_6 = (score_a_6/(parseInt(score_a_6)+parseInt(score_b_6))*100).toFixed(1)+"%";
    if(persen_a_6 =="NaN%" ){
      persen_a_6="0%"
    }
    document.getElementById("persen_a_6").innerHTML =persen_a_6;
    persen_a_7 = (score_a_7/(parseInt(score_a_7)+parseInt(score_b_7))*100).toFixed(1)+"%";
    if(persen_a_7 =="NaN%" ){
      persen_a_7="0%"
    }
    document.getElementById("persen_a_7").innerHTML =persen_a_7;
    persen_a_8 = (score_a_8/(parseInt(score_a_8)+parseInt(score_b_8))*100).toFixed(1)+"%";
    if(persen_a_8 =="NaN%" ){
      persen_a_8="0%"
    }
    document.getElementById("persen_a_8").innerHTML =persen_a_8;
    persen_a_9 = (score_a_9/(parseInt(score_a_9)+parseInt(score_b_9))*100).toFixed(1)+"%";
    if(persen_a_9 =="NaN%" ){
      persen_a_9="0%"
    }
    document.getElementById("persen_a_9").innerHTML =persen_a_9;
    persen_a_10 = (score_a_10/(parseInt(score_a_10)+parseInt(score_b_10))*100).toFixed(1)+"%";
    if(persen_a_10 =="NaN%" ){
      persen_a_10="0%"
    }
    document.getElementById("persen_a_10").innerHTML =persen_a_10;

    persen_b_2 =( score_b_2/(parseInt(score_a_2)+parseInt(score_b_2))*100).toFixed(1)+"%";
    if(persen_b_2 =="NaN%" ){
      persen_b_2="0%"
    }
    document.getElementById("persen_b_2").innerHTML =persen_b_2;
    persen_b_4 = (score_b_4/(parseInt(score_a_4)+parseInt(score_b_4))*100).toFixed(1)+"%";
    if(persen_b_4 =="NaN%" ){
      persen_b_4="0%"
    }
    document.getElementById("persen_b_4").innerHTML =persen_b_4;
    persen_b_5 = (score_b_5/(parseInt(score_a_5)+parseInt(score_b_5))*100).toFixed(1)+"%";
    if(persen_b_5 =="NaN%" ){
      persen_b_5="0%"
    }
    document.getElementById("persen_b_5").innerHTML =persen_b_5;
    persen_b_6 = (score_b_6/(parseInt(score_a_6)+parseInt(score_b_6))*100).toFixed(1)+"%";
    if(persen_b_6 =="NaN%" ){
      persen_b_6="0%"
    }
    document.getElementById("persen_b_6").innerHTML =persen_b_6;
    persen_b_7 = (score_b_7/(parseInt(score_a_7)+parseInt(score_b_7))*100).toFixed(1)+"%";
    if(persen_b_7 =="NaN%" ){
      persen_b_7="0%"
    }
    document.getElementById("persen_b_7").innerHTML =persen_b_7;
    persen_b_8 = (score_b_8/(parseInt(score_a_8)+parseInt(score_b_8))*100).toFixed(1)+"%";
    if(persen_b_8 =="NaN%" ){
      persen_b_8="0%"
    }
    document.getElementById("persen_b_8").innerHTML =persen_b_8;
    persen_b_9 = (score_b_9/(parseInt(score_a_9)+parseInt(score_b_9))*100).toFixed(1)+"%";
    if(persen_b_9 =="NaN%" ){
      persen_b_9="0%"
    }
    document.getElementById("persen_b_9").innerHTML =persen_b_9;
    persen_b_10 = (score_b_10/(parseInt(score_a_10)+parseInt(score_b_10))*100).toFixed(1)+"%";
    if(persen_b_10 =="NaN%" ){
      persen_b_10="0%"
    }
    document.getElementById("persen_b_10").innerHTML =persen_b_10;

    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("persen_a_1").update({
      nilai: persen_a_1,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("persen_a_2").update({
      nilai: persen_a_2,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("persen_a_3").update({
      nilai: persen_a_3,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("persen_a_4").update({
      nilai: persen_a_4,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("persen_a_5").update({
      nilai: persen_a_5,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("persen_a_6").update({
      nilai: persen_a_6,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("persen_a_7").update({
      nilai: persen_a_7,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("persen_a_8").update({
      nilai: persen_a_8,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("persen_a_9").update({
      nilai: persen_a_9,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("persen_a_10").update({
      nilai: persen_a_10,
    });
 

    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("persen_b_1").update({
      nilai: persen_b_1,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("persen_b_2").update({
      nilai: persen_b_2,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("persen_b_3").update({
      nilai: persen_b_3,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("persen_b_4").update({
      nilai: persen_b_4,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("persen_b_5").update({
      nilai: persen_b_5,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("persen_b_6").update({
      nilai: persen_b_6,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("persen_b_7").update({
      nilai: persen_b_7,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("persen_b_8").update({
      nilai: persen_b_8,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("persen_b_9").update({
      nilai: persen_b_9,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("persen_b_10").update({
      nilai: persen_b_10,
    });
   
/////////////////////////dari sini diambil data statistik
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_a_1").update({
      nilai: score_a_1,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_"+ronde).update({
      skor_a_1: score_a_1,
    });

    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_a_2").update({
      nilai: score_a_2,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_"+ronde).update({
      skor_a_2: score_a_2,
    });

    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_a_3").update({
      nilai: score_a_3,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_"+ronde).update({
      skor_a_3: score_a_3,
    });

    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_a_4").update({
      nilai: score_a_4,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_"+ronde).update({
      skor_a_4: score_a_4,
    });

    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_a_5").update({
      nilai: score_a_5,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_"+ronde).update({
      skor_a_5: score_a_5,
    });

    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_a_6").update({
      nilai: score_a_6,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_"+ronde).update({
      skor_a_6: score_a_6,
    });

    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_a_7").update({
      nilai: score_a_7,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_"+ronde).update({
      skor_a_7: score_a_7,
    });

    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_a_8").update({
      nilai: score_a_8,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_"+ronde).update({
      skor_a_8: score_a_8,
    });

    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_a_9").update({
      nilai: score_a_9,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_"+ronde).update({
      skor_a_9: score_a_9,
    });

    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_a_10").update({
      nilai: score_a_10,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_"+ronde).update({
      skor_a_10: score_a_10,
    });

    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_a_11").update({
      nilai: final_score_a,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_"+ronde).update({
      skor_a_11: final_score_a,
    });


    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_b_1").update({
      nilai: score_b_1,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_"+ronde).update({
      skor_b_1: score_b_1,
    });
    
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_b_2").update({
      nilai: score_b_2,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_"+ronde).update({
      skor_b_2: score_b_2,
    });

    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_b_3").update({
      nilai: score_b_3,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_"+ronde).update({
      skor_b_3: score_b_3,
    });

    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_b_4").update({
      nilai: score_b_4,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_"+ronde).update({
      skor_b_4: score_b_4,
    });

    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_b_5").update({
      nilai: score_b_5,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_"+ronde).update({
      skor_b_5: score_b_5,
    });

    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_b_6").update({
      nilai: score_b_6,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_"+ronde).update({
      skor_b_6: score_b_6,
    });

    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_b_7").update({
      nilai: score_b_7,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_"+ronde).update({
      skor_b_7: score_b_7,
    });

    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_b_8").update({
      nilai: score_b_8,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_"+ronde).update({
      skor_b_8: score_b_8,
    });

    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_b_9").update({
      nilai: score_b_9,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_"+ronde).update({
      skor_b_9: score_b_9,
    });

    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_b_10").update({
      nilai: score_b_10,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_"+ronde).update({
      skor_b_10: score_b_10,
    });

    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_b_11").update({
      nilai: final_score_b,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_"+ronde).update({
      skor_b_11: final_score_b,
    });

    
  }

  

  function hapus() {

    data_hapus_lapangan = document.getElementById("field_hapus").value;
    data_hapus_ronde = document.getElementById("ronde_hapus").value;

    let userRef1 = firebase.database().ref("game").child("lapangan_"+data_hapus_lapangan).child("ronde_"+data_hapus_ronde);
    userRef1.remove()
    alert("Data berhasil dihapus, Silahkan Reload halaman")
  }


  let x=0;
  function submit_data_final_statistik(){
   
    var messagesRef = firebase.database();
    let jumlah_skor_a=[],skor_a=[];
    let jumlah_skor_b=[],skor_b=[];
    let persen_a=[],persen_b=[];


    for (let y = 1; y <= 11; y++) {
      jumlah_skor_a[y]=0;
      for (let i = 1; i <= jumlah_ronde_db; i++) {
        var ref = messagesRef.ref("game").child("lapangan_"+field_number).child("ronde_"+i).child("skor_a_"+y);
        ref.on("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                data = childSnapshot.val();
                skor_a[y]= parseInt(data);
            });
        })
        jumlah_skor_a[y] = jumlah_skor_a[y]+skor_a[y];
      }
    }

    for (let y = 1; y <= 11; y++) {
      jumlah_skor_b[y]=0;
      for (let i = 1; i <= jumlah_ronde_db; i++) {
        var ref = messagesRef.ref("game").child("lapangan_"+field_number).child("ronde_"+i).child("skor_b_"+y);
        ref.on("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                data = childSnapshot.val();
                skor_b[y]= parseInt(data);
            });
        })
        jumlah_skor_b[y] = jumlah_skor_b[y]+skor_b[y];
      }
    }

  

    var ref = messagesRef.ref("game").child("lapangan_"+field_number).child("ronde_"+jumlah_ronde_db).child("skor_a_10");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            jumlah_skor_a[10]= parseInt(data);
        });
    })
    var ref = messagesRef.ref("game").child("lapangan_"+field_number).child("ronde_"+jumlah_ronde_db).child("skor_b_10");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data = childSnapshot.val();
            jumlah_skor_b[10]= parseInt(data);
        });
    })




    if(x==0){
      alert("Klik lagi untuk konfirmasi ");
    }
    if(x==1){
      alert("Data Final Berhasil Di update");
      field_number = document.getElementById("field_number").value;
      if(list_match_number.value==0){
        Match_NUMBER = "SINGLE";
        persen_a[1] = (jumlah_skor_a[1]/3*100).toFixed(1)+"%";
        document.getElementById("persen_a_1").innerHTML =persen_a[1];
        persen_a[3]= (jumlah_skor_a[3]/3*100).toFixed(1)+"%";
        document.getElementById("persen_a_3").innerHTML =persen_a[3];
        
        persen_b[1] = (jumlah_skor_b[1]/3*100).toFixed(1)+"%";
        document.getElementById("persen_b_1").innerHTML =persen_b[1];
        persen_b[3] = (jumlah_skor_b[3]/3*100).toFixed(1)+"%";
        document.getElementById("persen_b_3").innerHTML =persen_b[3];
      }
      if(list_match_number.value==1){
        Match_NUMBER = "DOUBLE";
        persen_a[1] = (jumlah_skor_a[1]/6*100).toFixed(1)+"%";
        document.getElementById("persen_a_1").innerHTML =persen_a[1];
        persen_a[3]= (jumlah_skor_a[3]/6*100).toFixed(1)+"%";
        document.getElementById("persen_a_3").innerHTML =persen_a[3];
        
        persen_b[1] = (jumlah_skor_b[1]/6*100).toFixed(1)+"%";
        document.getElementById("persen_b_1").innerHTML =persen_b[1];
        persen_b[3] = (jumlah_skor_b[3]/6*100).toFixed(1)+"%";
        document.getElementById("persen_b_3").innerHTML =persen_b[3];
      }
      if(list_match_number.value==2){
        Match_NUMBER = "TRIPLE";
        persen_a[1] = (jumlah_skor_a[1]/6*100).toFixed(1)+"%";
        document.getElementById("persen_a_1").innerHTML =persen_a[1];
        persen_a[3]= (jumlah_skor_a[3]/6*100).toFixed(1)+"%";
        document.getElementById("persen_a_3").innerHTML =persen_a[3];
        
        persen_b[1] = (jumlah_skor_b[1]/6*100).toFixed(1)+"%";
        document.getElementById("persen_b_1").innerHTML =persen_b[1];
        persen_b[3] = (jumlah_skor_b[3]/6*100).toFixed(1)+"%";
        document.getElementById("persen_b_3").innerHTML =persen_b[3];
      }
      
  
  
  
    persen_a[2]= (jumlah_skor_a[2]/(parseInt(jumlah_skor_a[2])+parseInt(jumlah_skor_b[2]))*100).toFixed(1)+"%";
    if(persen_a[2] =="NaN%" ){
      persen_a[2]="0%"
    }
    document.getElementById("persen_a_2").innerHTML =persen_a[2];
    persen_a[4]= (jumlah_skor_a[4]/(parseInt(jumlah_skor_a[4])+parseInt(jumlah_skor_b[4]))*100).toFixed(1)+"%";
    if(persen_a[4] =="NaN%" ){
      persen_a[4]="0%"
    }
    document.getElementById("persen_a_4").innerHTML =persen_a[4];
    persen_a[5]= (jumlah_skor_a[5]/(parseInt(jumlah_skor_a[5])+parseInt(jumlah_skor_b[5]))*100).toFixed(1)+"%";
    if(persen_a[5] =="NaN%" ){
      persen_a[5]="0%"
    }
    document.getElementById("persen_a_5").innerHTML =persen_a[5];
    persen_a[6]= (jumlah_skor_a[6]/(parseInt(jumlah_skor_a[6])+parseInt(jumlah_skor_b[6]))*100).toFixed(1)+"%";
    if(persen_a[6] =="NaN%" ){
      persen_a[6]="0%"
    }
    document.getElementById("persen_a_6").innerHTML =persen_a[6];
    persen_a[7]= (jumlah_skor_a[7]/(parseInt(jumlah_skor_a[7])+parseInt(jumlah_skor_b[7]))*100).toFixed(1)+"%";
    if(persen_a[7] =="NaN%" ){
      persen_a[7]="0%"
    }
    document.getElementById("persen_a_7").innerHTML =persen_a[7];
    persen_a[8]= (jumlah_skor_a[8]/(parseInt(jumlah_skor_a[8])+parseInt(jumlah_skor_b[8]))*100).toFixed(1)+"%";
    if(persen_a[8] =="NaN%" ){
      persen_a[8]="0%"
    }
    document.getElementById("persen_a_8").innerHTML =persen_a[8];
    persen_a[9]= (jumlah_skor_a[9]/(parseInt(jumlah_skor_a[9])+parseInt(jumlah_skor_b[9]))*100).toFixed(1)+"%";
    if(persen_a[9] =="NaN%" ){
      persen_a[9]="0%"
    }
    document.getElementById("persen_a_9").innerHTML =persen_a[9];
    persen_a[10]= (jumlah_skor_a[10]/(parseInt(jumlah_skor_a[10])+parseInt(jumlah_skor_b[10]))*100).toFixed(1)+"%";
    if(persen_a[10] =="NaN%" ){
      persen_a[10]="0%"
    }
    document.getElementById("persen_a_10").innerHTML =persen_a[10];
  
  
    persen_b[2]= (jumlah_skor_b[2]/(parseInt(jumlah_skor_b[2])+parseInt(jumlah_skor_b[2]))*100).toFixed(1)+"%";
    if(persen_b[2] =="NaN%" ){
      persen_b[2]="0%"
    }
    document.getElementById("persen_b_2").innerHTML =persen_b[2];
    persen_b[4]= (jumlah_skor_b[4]/(parseInt(jumlah_skor_b[4])+parseInt(jumlah_skor_b[4]))*100).toFixed(1)+"%";
    if(persen_b[4] =="NaN%" ){
      persen_b[4]="0%"
    }
    document.getElementById("persen_b_4").innerHTML =persen_b[4];
    persen_b[5]= (jumlah_skor_b[5]/(parseInt(jumlah_skor_b[5])+parseInt(jumlah_skor_b[5]))*100).toFixed(1)+"%";
    if(persen_b[5] =="NaN%" ){
      persen_b[5]="0%"
    }
    document.getElementById("persen_b_5").innerHTML =persen_b[5];
    persen_b[6]= (jumlah_skor_b[6]/(parseInt(jumlah_skor_b[6])+parseInt(jumlah_skor_b[6]))*100).toFixed(1)+"%";
    if(persen_b[6] =="NaN%" ){
      persen_b[6]="0%"
    }
    document.getElementById("persen_b_6").innerHTML =persen_b[6];
    persen_b[7]= (jumlah_skor_b[7]/(parseInt(jumlah_skor_b[7])+parseInt(jumlah_skor_b[7]))*100).toFixed(1)+"%";
    if(persen_b[7] =="NaN%" ){
      persen_b[7]="0%"
    }
    document.getElementById("persen_b_7").innerHTML =persen_b[7];
    persen_b[8]= (jumlah_skor_b[8]/(parseInt(jumlah_skor_b[8])+parseInt(jumlah_skor_b[8]))*100).toFixed(1)+"%";
    if(persen_b[8] =="NaN%" ){
      persen_b[8]="0%"
    }
    document.getElementById("persen_b_8").innerHTML =persen_b[8];
    persen_b[9]= (jumlah_skor_b[9]/(parseInt(jumlah_skor_b[9])+parseInt(jumlah_skor_b[9]))*100).toFixed(1)+"%";
    if(persen_b[9] =="NaN%" ){
      persen_b[9]="0%"
    }
    document.getElementById("persen_b_9").innerHTML =persen_b[9];
    persen_b[10]= (jumlah_skor_b[10]/(parseInt(jumlah_skor_b[10])+parseInt(jumlah_skor_b[10]))*100).toFixed(1)+"%";
    if(persen_b[10] =="NaN%" ){
      persen_b[10]="0%"
    }
    document.getElementById("persen_b_10").innerHTML =persen_b[10];


    //dari sini diambil 
  
      for (let z = 1; z <= 10; z++) {

        firebase.database().ref("game").child("lapangan_"+field_number).child("data_final").child("skor_a_"+z).update({
          nilai: jumlah_skor_a[z],
        });  

        firebase.database().ref("game").child("lapangan_"+field_number).child("data_final").child("skor_b_"+z).update({
          nilai: jumlah_skor_b[z],
        });
        firebase.database().ref("game").child("lapangan_"+field_number).child("data_final").child("persen_a_"+z).update({
          nilai: persen_a[z],
        });  
        firebase.database().ref("game").child("lapangan_"+field_number).child("data_final").child("persen_b_"+z).update({
          nilai: persen_b[z],
        });  

        document.getElementById("skor_a_"+z).innerHTML =jumlah_skor_a[z];
        document.getElementById("skor_b_"+z).innerHTML =jumlah_skor_b[z];
     
      }

      firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_100").update({
        skor_a_1: jumlah_skor_a[1],
      }); 
      firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_100").update({
        skor_b_1: jumlah_skor_b[1],
      }); 

      firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_100").update({
        skor_a_2: jumlah_skor_a[2],
      }); 
      firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_100").update({
        skor_b_2: jumlah_skor_b[2],
      }); 

      firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_100").update({
        skor_a_3: jumlah_skor_a[3],
      }); 
      firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_100").update({
        skor_b_3: jumlah_skor_b[3],
      }); 

      firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_100").update({
        skor_a_4: jumlah_skor_a[4],
      }); 
      firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_100").update({
        skor_b_4: jumlah_skor_b[4],
      }); 

      firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_100").update({
        skor_a_5: jumlah_skor_a[5],
      }); 
      firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_100").update({
        skor_b_5: jumlah_skor_b[5],
      }); 

      firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_100").update({
        skor_a_6: jumlah_skor_a[6],
      }); 
      firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_100").update({
        skor_b_6: jumlah_skor_b[6],
      }); 

      firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_100").update({
        skor_a_7: jumlah_skor_a[7],
      }); 
      firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_100").update({
        skor_b_7: jumlah_skor_b[7],
      }); 

      firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_100").update({
        skor_a_8: jumlah_skor_a[8],
      }); 
      firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_100").update({
        skor_b_8: jumlah_skor_b[8],
      }); 

      firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_100").update({
        skor_a_9: jumlah_skor_a[9],
      }); 
      firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_100").update({
        skor_b_9: jumlah_skor_b[9],
      }); 

      firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_100").update({
        skor_a_10: jumlah_skor_a[10],
      });      
      firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_100").update({
        skor_b_10: jumlah_skor_b[10],
      }); 

      firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_100").update({
        skor_a_11: jumlah_skor_a[10],
      });   
      firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_100").update({
        skor_b_11: jumlah_skor_b[10],
      }); 
      firebase.database().ref("game").child("lapangan_"+field_number).child("table_pertandingan").child("ronde_100").update({
        round_number: "FINAL",
      }); 

     
      
      firebase.database().ref("game").child("lapangan_"+field_number).child("data_final").child("skor_a_10").update({
        nilai: jumlah_skor_a[10],
      });      
      firebase.database().ref("game").child("lapangan_"+field_number).child("data_final").child("skor_b_10").update({
        nilai: jumlah_skor_b[10],
      });
      firebase.database().ref("game").child("lapangan_"+field_number).child("data_final").child("skor_a_11").update({
        nilai: jumlah_skor_a[10],
      });      
      firebase.database().ref("game").child("lapangan_"+field_number).child("data_final").child("skor_b_11").update({
        nilai: jumlah_skor_b[10],
      });
      document.getElementById("skor_a_11").innerHTML =jumlah_skor_a[10];
      document.getElementById("skor_b_11").innerHTML =jumlah_skor_b[10];

      x=0;
    }



  x++;
  }

  function lihat(){
    lapangan_view = document.getElementById("lapangan_view").value;
    var dbRef = firebase.database();
    var address_db = dbRef.ref("game/lapangan_"+lapangan_view+"/table_pertandingan");
    var table = document.getElementById("tabel-status-alat").getElementsByTagName('tbody')[0];;

    var dbRef_2 = firebase.database();
    var address_db_2 = dbRef_2.ref("game/lapangan_"+lapangan_view+"/table_pertandingan");
    var table_2 = document.getElementById("tabel-status-alat_2").getElementsByTagName('tbody')[0];;

    alert("Menampilkan table pertandingan di lapangan "+ lapangan_view)


    address_db.on("child_added", function(data, prevChildKey) {
      var variabel_db = data.val();
      var row = table.insertRow(table.rows.length);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      var cell6 = row.insertCell(5);
      var cell7 = row.insertCell(6);
      var cell8 = row.insertCell(7);
      var cell9 = row.insertCell(8);
      var cell10 = row.insertCell(9);
      var cell11 = row.insertCell(10);
      var cell12 = row.insertCell(11);

      cell1.innerHTML = variabel_db.round_number;
      cell2.innerHTML = variabel_db.skor_a_1;
      cell3.innerHTML = variabel_db.skor_a_2;
      cell4.innerHTML = variabel_db.skor_a_3;
      cell5.innerHTML = variabel_db.skor_a_4;
      cell6.innerHTML = variabel_db.skor_a_5;
      cell7.innerHTML = variabel_db.skor_a_6;
      cell8.innerHTML = variabel_db.skor_a_7;
      cell9.innerHTML = variabel_db.skor_a_8;
      cell10.innerHTML = variabel_db.skor_a_9;
      cell11.innerHTML = variabel_db.skor_a_10;
      cell12.innerHTML = variabel_db.skor_a_11;
    
    });

    address_db_2.on("child_added", function(data, prevChildKey) {
      var variabel_db_2 = data.val();
      var row = table_2.insertRow(table_2.rows.length);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      var cell6 = row.insertCell(5);
      var cell7 = row.insertCell(6);
      var cell8 = row.insertCell(7);
      var cell9 = row.insertCell(8);
      var cell10 = row.insertCell(9);
      var cell11 = row.insertCell(10);
      var cell12 = row.insertCell(11);

      cell1.innerHTML = variabel_db_2.round_number;
      cell2.innerHTML = variabel_db_2.skor_b_1;
      cell3.innerHTML = variabel_db_2.skor_b_2;
      cell4.innerHTML = variabel_db_2.skor_b_3;
      cell5.innerHTML = variabel_db_2.skor_b_4;
      cell6.innerHTML = variabel_db_2.skor_b_5;
      cell7.innerHTML = variabel_db_2.skor_b_6;
      cell8.innerHTML = variabel_db_2.skor_b_7;
      cell9.innerHTML = variabel_db_2.skor_b_8;
      cell10.innerHTML = variabel_db_2.skor_b_9;
      cell11.innerHTML = variabel_db_2.skor_b_10;
      cell12.innerHTML = variabel_db_2.skor_b_11;
    
    });





  }








  function htmlTableToExcel(type){
    var data = document.getElementById('tabel-status-alat');
    var excelFile = XLSX.utils.table_to_book(data, {sheet: "sheet1"});
    XLSX.write(excelFile, { bookType: type, bookSST: true, type: 'base64' });
    XLSX.writeFile(excelFile, 'TABLE PETANQUE TEAM A.xlsx');
}

function htmlTableToExcel_2(type){
  var data = document.getElementById('tabel-status-alat_2');
  var excelFile = XLSX.utils.table_to_book(data, {sheet: "sheet1"});
  XLSX.write(excelFile, { bookType: type, bookSST: true, type: 'base64' });
  XLSX.writeFile(excelFile, 'TABLE PETANQUE TEAM B.xlsx');
}


function save_print(){
  var printContents = document.getElementById("printableArea").innerHTML;
     var originalContents = document.body.innerHTML;

     document.body.innerHTML = printContents;

     window.print();

     document.body.innerHTML = originalContents;
}
