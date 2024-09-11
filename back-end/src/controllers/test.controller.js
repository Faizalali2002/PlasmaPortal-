export const testController = (req, res) => {
  res.status(200).json({
    message: "Test route is working successfully!",
    success: true,
  });
};
