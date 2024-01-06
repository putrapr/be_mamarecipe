const getPublicId = (imageUrl) => { 
  // http://res.cloudinary.com/dzpf9unc5/image/upload/v1696776828/fcsedax625wudqmfvxfd.jpg
  let tempArray = imageUrl.split('/');
  let image = tempArray[tempArray.length - 1].toString(); // fcsedax625wudqmfvxfd.jpg
  tempArray = image.split('.');
  return tempArray[0]; // fcsedax625wudqmfvxfd
};

export default getPublicId;