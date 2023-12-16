function rename(path, newName) {
  path.scope.rename(path.node.name, newName);
}

module.exports = {
  rename,
};
