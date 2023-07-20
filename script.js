async function getData() {
  const spreadsheetId = '1EbKqSZR0u637wPIOnLkRX27EEQPgMk6k070RHt5-Bl0'
  const apiKey = 'AIzaSyBSLWlswwRShiPHcZ08maoN2TAPwggc1OM';
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/?key=${apiKey}&includeGridData=true`;
  const result = await fetch(url)
  const { sheets } = await result.json();
  const firstSheet = sheets[0];
  const data = firstSheet.data[0].rowData
      .filter((_, index) => index !== 0) // Mulai dari index 1 (menghindari nama kolom)
      .map(row => {
          const { values } = row;
          return {
              name: values[0].formattedValue,
              email: values[1].formattedValue,
          }
      })
  return data;
}
