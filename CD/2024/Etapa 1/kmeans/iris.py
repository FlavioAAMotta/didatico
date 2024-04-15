import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from sklearn import datasets
from sklearn.decomposition import PCA

# Carregar o conjunto de dados Iris
iris = datasets.load_iris()
X = iris.data
y = iris.target

# PCA para reduzir a dimensão para 3D para visualização
pca_3d = PCA(n_components=3)
X_reduced_3d = pca_3d.fit_transform(X)

# Plotar o gráfico 3D
fig = plt.figure(figsize=(16, 8))
ax = fig.add_subplot(121, projection='3d')
ax.scatter(X_reduced_3d[:, 0], X_reduced_3d[:, 1], X_reduced_3d[:, 2], c=y, cmap='viridis', edgecolor='k', s=40)
ax.set_title("Redução de Dimensionalidade para 3D")
ax.set_xlabel("PC1")
ax.set_ylabel("PC2")
ax.set_zlabel("PC3")

# PCA para reduzir a dimensão para 2D
pca_2d = PCA(n_components=2)
X_reduced_2d = pca_2d.fit_transform(X)

# Plotar o gráfico 2D
ax2 = fig.add_subplot(122)
ax2.scatter(X_reduced_2d[:, 0], X_reduced_2d[:, 1], c=y, cmap='viridis', edgecolor='k', s=40)
ax2.set_title("Redução de Dimensionalidade para 2D")
ax2.set_xlabel("PC1")
ax2.set_ylabel("PC2")

plt.show()
