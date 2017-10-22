export default function getDate() {
    const data = new Date(),
          month = data.getMonth(),
          day = data.getDate(),
          year = data.getFullYear();
    let fMonth = '';
    switch (month)
    {
      case 0: fMonth='January'; break;
      case 1: fMonth='February'; break;
      case 2: fMonth='March'; break;
      case 3: fMonth='April'; break;
      case 4: fMonth='May'; break;
      case 5: fMonth='June'; break;
      case 6: fMonth='July'; break;
      case 7: fMonth='August'; break;
      case 8: fMonth='September'; break;
      case 9: fMonth='October'; break;
      case 10: fMonth='November'; break;
      case 11: fMonth='December'; break;
      default:
    }
    return `${day} ${fMonth} ${year}`;
  }