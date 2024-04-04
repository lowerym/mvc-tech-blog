module.exports = {
  format_date: (date) => {
    return date.toLocaleDateString();
  },

  format_amount: (amount) => {
    return parseInt(amount).toLocaleString();
  },

  is_my_page: (pageUser, userID) => {
    return pageUser === userID;
  },
};
