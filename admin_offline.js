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

    
    nama_team_b = document.getElementById("nama_team_b").value;
    document.getElementById("team_b_name").innerHTML =nama_team_b;
    nama_team_a = document.getElementById("nama_team_a").value;
    document.getElementById("team_a_name").innerHTML =nama_team_a;
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
          firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("round_number").update({
            nilai: ronde,
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
    

    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_a_1").update({
      nilai: score_a_1,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_a_2").update({
      nilai: score_a_2,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_a_3").update({
      nilai: score_a_3,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_a_4").update({
      nilai: score_a_4,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_a_5").update({
      nilai: score_a_5,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_a_6").update({
      nilai: score_a_6,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_a_7").update({
      nilai: score_a_7,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_a_8").update({
      nilai: score_a_8,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_a_9").update({
      nilai: score_a_9,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_a_10").update({
      nilai: score_a_10,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_a_11").update({
      nilai: final_score_a,
    });


    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_b_1").update({
      nilai: score_b_1,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_b_2").update({
      nilai: score_b_2,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_b_3").update({
      nilai: score_b_3,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_b_4").update({
      nilai: score_b_4,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_b_5").update({
      nilai: score_b_5,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_b_6").update({
      nilai: score_b_6,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_b_7").update({
      nilai: score_b_7,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_b_8").update({
      nilai: score_b_8,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_b_9").update({
      nilai: score_b_9,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_b_10").update({
      nilai: score_b_10,
    });
    firebase.database().ref("game").child("lapangan_"+field_number).child("ronde_"+ronde).child("skor_b_11").update({
      nilai: final_score_b,
    });

    
  }

  

  function hapus() {

    data_hapus_lapangan = document.getElementById("field_hapus").value;
    data_hapus_ronde = document.getElementById("ronde_hapus").value;

    let userRef1 = firebase.database().ref("game").child("lapangan_"+data_hapus_lapangan).child("ronde_"+data_hapus_ronde);
    userRef1.remove()
    alert("Data berhasil dihapus, Silahkan Reload halaman")
  }



  
