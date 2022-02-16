const getDateBeforeOneMonth = () => {
  const time = new Date();
  time.setMonth(time.getMonth() - 1);
  return time.toJSON();
};

module.exports = getDateBeforeOneMonth;
