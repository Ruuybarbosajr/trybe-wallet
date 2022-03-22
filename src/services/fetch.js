const fetchCurrency = async () => {
  try {
    const response = await (await fetch('https://economia.awesomeapi.com.br/json/all')).json();
    return response;
  } catch (error) {
    console.error(error.message);
  }
};
export default fetchCurrency;
