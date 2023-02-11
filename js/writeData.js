
 function writeTable(tableTitle, tableId, tableStr){

  mainDiv = document.getElementById("container")

  // create a div for the table
  let tableDiv = document.createElement("div"); 
  tableDiv.setAttribute("id",tableId);

  tableDiv.innerHTML += `<h4>${tableTitle}</h4>`;

  // create a table tag
  const table = document.createElement("table"); 

  // add table str to tbody element 
  let tableBody = document.createElement("tbody"); 
  tableBody.innerHTML += tableStr;


  table.appendChild(tableBody);
  tableDiv.appendChild(table);
  mainDiv.appendChild(tableDiv);

 }


function writeArchiveGameUrls(archiveGameUrls, userName) {

  let tableStr = "";
  tableStr += "<tr>";
  tableStr += "<th> Url </th>";
  tableStr += "<th> Date </th>";
  tableStr += "<th> Game Type </th>";
  tableStr += "<th> Color </th>";
  tableStr += "<th> Result </th>";
  tableStr += "<th> Opponent </th>";
  tableStr += "<th> Opening </th>";
  tableStr += "</tr>";

  for (var i=0; i < archiveGameUrls.length; i++) {
      let gameNode = parseGameNode(archiveGameUrls[i], userName);
      let gameUrl = gameNode.url;
      let gameColor = gameNode.color;
      let gameResult = gameNode.result;
      let gameOpponent = gameNode.opponent;
      tableStr += "<tr> ";
      tableStr += `<td> <a href="${gameUrl}"  target='_blank' > Link </td>`;
      tableStr += `<td> ${gameNode.date} </td>`;
      tableStr += `<td> ${gameNode.gameType} </td>`;
      tableStr += `<td> ${gameColor} </td>`;
      tableStr += `<td> ${gameResult} </td>`;
      tableStr += `<td> <a href="${gameNode.opponentUrl}"  target='_blank' > ${gameOpponent} </td>`;
      tableStr += `<td> <a href="${gameNode.openingUrl}"  target='_blank' > ${gameNode.opening} </td>`;
      tableStr += "</tr> ";
   }

  writeTable("All Games", "gameTable", tableStr);

}

function writeGameStats(archivedGames, uname){

  let numGames = archivedGames.length;
  let numWins = 0;
  let numLosses = 0;
  let numCheckmated = 0;
  let numStalemate = 0;
  let numTimeout= 0;
  let numDraw = 0;
  let numAgreed= 0;
  let numResigned = 0;
  let numAbandoned = 0;

  for (var i=0; i <archivedGames.length; i++){
      let gameNode = parseGameNode(archivedGames[i], uname);

      if (gameNode.result == "win") {
          numWins++;
      }

      else if (gameNode.result == "stalemate") {
          numStalemate++;
          numDraw++;
      }
      else if (gameNode.result == "agreed") {
          numAgreed++;
          numDraw++;
      }
      else if (gameNode.result == "checkmated")
      {
          numCheckmated++;
          numLosses++;
      }
      else if (gameNode.result == "timeout")
      {
          numTimeout++;
          numLosses++;
      }
      else if (gameNode.result == "resigned")
      {
          numResigned++;
          numLosses++;
      }
      else if (gameNode.result == "abandoned")
      {
          numAbandoned++;
          numLosses++;
      }


  }


  // make table header 
  let tableStr = "";
  tableStr += "<tr>";
  tableStr += "<th> Games Played </th>";
  tableStr += "<th> Wins </th>";
  tableStr += "<th> Losses </th>";
  tableStr += "<th> Draws </th>";
  tableStr += "</tr>";


  // make table data
  tableStr += "<tr> ";
  tableStr += `<td> ${numGames} </td>`;
  tableStr += `<td> ${numWins} </td>`;
  tableStr += `<td> ${numLosses} </td>`;
  tableStr += `<td> ${numDraw} </td>`;
  tableStr += "</tr> ";

  writeTable("Overall Game Stats", "statTable", tableStr);

}



function writePlayerStats(playerStats) {

  tableStr = "";

  // headers
  tableStr += "<tr>";
  tableStr += "<th></th>";
  tableStr += "<td> Daily </td>";
  tableStr += "<td> Rapid </td>";
  tableStr += "<td> Bullet </td>";
  tableStr += "<td> Blitz </td>";
  tableStr += "</tr>";

  
  tableStr += "<tr>";
  tableStr += `<th>Best Rated Win</th>`;

  // Daily stats
  let bestDailyRating = "No Daily Wins";
  let bestDailyRatingUrl = "";
  if (playerStats.chess_daily.record.win > 0) {
      bestDailyRating =  playerStats.chess_daily.best.rating;
    if (playerStats.chess_daily.hasOwnProperty("game")) {
      bestDailyRatingUrl =  playerStats.chess_daily.best.game;
    }
  }

  // Rapid stats
  let bestRapidRating = "No Rapid Wins"; 
  let bestRapidRatingUrl = ""; 
  if (playerStats.chess_rapid.record.win > 0) {
      bestRapidRating = playerStats.chess_rapid.best.rating;
    if (playerStats.chess_rapid.best.hasOwnProperty("game")) {
      bestRapidRatingUrl = playerStats.chess_rapid.best.game;
      console.log(`172: ${bestRapidRatingUrl}`);
    }
  }

  // Bullet stats
  let bestBulletRating = "No Bullet Wins";
  let bestBulletRatingUrl = "";
  if (playerStats.chess_bullet.record.win > 0) {
      bestBulletRating =  playerStats.chess_bullet.best.rating;
    if (playerStats.chess_daily.best.hasOwnProperty("game")) {
      bestBulletRatingUrl =  playerStats.chess_bullet.best.game;
    }
  }

// Blitz Stats
  let bestBlitzRating = "No Blitz Wins";
  let bestBlitzRatingUrl = "";
  if (playerStats.chess_blitz.record.win > 0) {
      bestBlitzRating =  playerStats.chess_blitz.best.rating;
    if (playerStats.chess_blitz.best.hasOwnProperty("game")) {
      bestBlitzRatingUrl =  playerStats.chess_blitz.best.game;
    }
  }

  console.log(`rapid: ${bestRapidRating}`)
  console.log(`rapidurl: ${bestRapidRatingUrl}`)

  if (bestDailyRatingUrl != "" ) {
    tableStr += `<td> <a href="${bestDailyRatingUrl}"  target='_blank' > ${bestDailyRating}</td>`;
  }
  else {
    tableStr += `<td>${bestDailyRating}</td>`;
  }

  // rapid
  if ( bestRapidRatingUrl != ""){
    tableStr += `<td> <a href="${bestRapidRatingUrl}"  target='_blank' > ${bestRapidRating}</td>`;
  }
  else {
    tableStr += `<td> ${bestRapidRating}</td>`;
  }

  
  // 
  if (bestBulletRatingUrl != "") {
    tableStr += `<td> <a href="${bestBulletRatingUrl}"  target='_blank' > ${bestBulletRating}</td>`;
  }
  else {
    tableStr += `<td> ${bestBulletRating}</td>`;
  }

  // blitz
  if (bestBlitzRatingUrl != "") {
    tableStr += `<td> <a href="${bestBlitzRatingUrl}"  target='_blank' > ${bestBlitzRating}</td>`;
  }
  else {
    tableStr += `<td>${bestBlitzRating}</td>`;
  }
  
  tableStr += "</tr>";



  writeTable("Player Stats", "playerStats", tableStr);


}