const mongoose = require('mongoose');
const { Schema } = mongoose;

// Gestion des événements MongoDB
mongoose.connection.on('connected', () => {
  console.log('Connexion à MongoDB réussie');
});

mongoose.connection.on('error', (err) => {
  console.error('Erreur de connexion à MongoDB :', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Déconnecté de MongoDB');
});

// Connexion à MongoDB
mongoose.connect('mongodb://admin:secret@mongo_db:27017/btp_module_db', {
  authSource: 'admin',
  connectTimeoutMS: 30000,
});

// Schémas des collections
const chantierSchema = new Schema({
  numero: String,
  title: String,
  description: String,
  notes: String,
  commentaires: [String],
  client: String,
  status: String,
  debut_prevu: Date,
  fin_prevu: Date,
  personnels: [{ type: Schema.Types.ObjectId, ref: 'Personnel' }],
  fournitures: [{ type: Schema.Types.ObjectId, ref: 'Fourniture' }],
  outillages: [{ type: Schema.Types.ObjectId, ref: 'Outils' }],
  devis: { type: Schema.Types.ObjectId, ref: 'Devis' },
});

const fournitureSchema = new Schema({
  name: String,
  description: String,
  unit: String,
  quantity: Number,
  price: Number,
});

const outilsSchema = new Schema({
  name: String,
  type: String,
  quantity: Number,
  quantity_available: Number,
  available: Boolean,
});

const personnelSchema = new Schema({
  name: String,
  role: String,
  active: Boolean,
  phone: String,
  email: String,
});

// Création des modèles
const Chantier = mongoose.model('Chantier', chantierSchema);
const Fourniture = mongoose.model('Fourniture', fournitureSchema);
const Outils = mongoose.model('Outils', outilsSchema);
const Personnel = mongoose.model('Personnel', personnelSchema);

// Fonction de seed
async function seedDatabase() {
  // Suppression des données existantes
  await Chantier.deleteMany();
  await Fourniture.deleteMany();
  await Outils.deleteMany();
  await Personnel.deleteMany();

  // Création des personnels
  const personnels = await Personnel.insertMany([
    { name: 'Jean Dupont', role: 'Carreleur', active: true, phone: '0601234567', email: 'jean.dupont@mail.com' },
    { name: 'Marie Curie', role: 'Chef de chantier', active: true, phone: '0612345678', email: 'marie.curie@mail.com' },
    { name: 'Paul Martin', role: 'Chapeur', active: true, phone: '0623456789', email: 'paul.martin@mail.com' },
    { name: 'Lucie Bernard', role: 'Assistante technique', active: true, phone: '0634567890', email: 'lucie.bernard@mail.com' },
    { name: 'Marc Leclerc', role: 'Parqueteur', active: true, phone: '0645678901', email: 'marc.leclerc@mail.com' },
    { name: 'Sophie Garnier', role: 'Gestionnaire de stock', active: true, phone: '0656789012', email: 'sophie.garnier@mail.com' },
    { name: 'Antoine Dubois', role: 'Apprenti carreleur', active: true, phone: '0667890123', email: 'antoine.dubois@mail.com' },
    { name: 'Emma Robert', role: 'Technicienne', active: true, phone: '0678901234', email: 'emma.robert@mail.com' },
    { name: 'Lucas Moreau', role: 'Conducteur d’engins', active: true, phone: '0689012345', email: 'lucas.moreau@mail.com' },
    { name: 'Clara Petit', role: 'Responsable qualité', active: true, phone: '0690123456', email: 'clara.petit@mail.com' },
  ]);

  // Création des outils
  const outils = await Outils.insertMany([
    { name: 'Marteau', type: 'Outil de base', available: true, quantity: 10, quantity_available: 10 },
    { name: 'Truelle', type: 'Outil de finition', available: true, quantity: 5, quantity_available: 5 },
    { name: 'Niveau à bulle', type: 'Outil de mesure', available: true, quantity: 3, quantity_available: 3 },
    { name: 'Mètre ruban', type: 'Outil de mesure', available: true, quantity: 5, quantity_available: 5 },
    { name: 'Scie circulaire', type: 'Outil électrique', available: true, quantity: 2, quantity_available: 2 },
    { name: 'Perceuse', type: 'Outil électrique', available: true, quantity: 3, quantity_available: 3 },
    { name: 'Visseuse', type: 'Outil électrique', available: true, quantity: 3, quantity_available: 3 },
    { name: 'Pelle', type: 'Outil de chantier', available: true, quantity: 2, quantity_available: 2 },
    { name: 'Brouette', type: 'Outil de transport', available: true, quantity: 2, quantity_available: 2 },
    { name: 'Cutter', type: 'Outil de coupe', available: true, quantity: 5, quantity_available: 5 },
    { name: 'Pinces', type: 'Outil de fixation', available: true, quantity: 5, quantity_available: 5 },
    { name: 'Spatule', type: 'Outil de finition', available: true, quantity: 5, quantity_available: 5 },
    { name: 'Pistolet à colle', type: 'Outil de fixation', available: true },
    { name: 'Ponceuse', type: 'Outil électrique', available: true },
    { name: 'Pistolet à peinture', type: 'Outil électrique', available: true },
    { name: 'Scie sauteuse', type: 'Outil électrique', available: true },
    { name: 'Massette', type: 'Outil de frappe', available: true },
    { name: 'Maillet', type: 'Outil de frappe', available: true },
    { name: 'Laser de mesure', type: 'Outil de mesure', available: true },
    { name: 'Seau', type: 'Outil de transport', available: true },
  ]);

  // Création des fournitures
  const fournitures = await Fourniture.insertMany([
    { name: 'Carrelage 30x30', description: 'Carrelage blanc pour salle de bain', unit: 'm²', quantity: 50, price: 10.5 },
    { name: 'Parquet chêne massif', description: 'Parquet haut de gamme', unit: 'm²', quantity: 20, price: 35 },
    { name: 'Ciment rapide', description: 'Ciment à prise rapide pour chape', unit: 'kg', quantity: 100, price: 8 },
    { name: 'Adhésif de carrelage', description: 'Colle pour carrelage', unit: 'kg', quantity: 50, price: 15 },
    { name: 'Joint silicone', description: 'Joint pour étanchéité', unit: 'tube', quantity: 30, price: 5 },
    { name: 'Sable', description: 'Sable pour mortier', unit: 'kg', quantity: 500, price: 2 },
    { name: 'Plinthe en bois', description: 'Plinthe assortie au parquet', unit: 'm', quantity: 100, price: 12 },
    { name: 'Peinture murale blanche', description: 'Peinture acrylique', unit: 'L', quantity: 20, price: 25 },
    { name: 'Carrelage imitation bois', description: 'Carrelage effet parquet', unit: 'm²', quantity: 40, price: 18 },
    { name: 'Produit de nettoyage', description: 'Nettoyant pour carrelage', unit: 'L', quantity: 30, price: 8 },
    { name: 'Chape liquide', description: 'Chape autonivelante', unit: 'kg', quantity: 200, price: 7 },
    { name: 'Isolant phonique', description: 'Sous-couche pour parquet', unit: 'm²', quantity: 50, price: 5 },
    { name: 'Profilé aluminium', description: 'Profilé de finition', unit: 'm', quantity: 60, price: 15 },
    { name: 'Mortier-colle', description: 'Mortier pour chape', unit: 'kg', quantity: 80, price: 10 },
    { name: 'Kit de pose parquet', description: 'Outils pour pose', unit: 'kit', quantity: 10, price: 50 },
    { name: 'Plâtre', description: 'Plâtre pour finitions', unit: 'kg', quantity: 100, price: 6 },
    { name: 'Tasseaux bois', description: 'Tasseaux pour support', unit: 'm', quantity: 80, price: 4 },
    { name: 'Film polyane', description: 'Film étanche pour chape', unit: 'm²', quantity: 100, price: 3 },
    { name: 'Carrelage 60x60', description: 'Carrelage grand format', unit: 'm²', quantity: 30, price: 20 },
    { name: 'Vis à bois', description: 'Vis pour assemblage', unit: 'boîte', quantity: 50, price: 10 },
  ]);

  // Création des chantiers
  const chantiers = await Chantier.insertMany([
    {
        numero: 'CH-001',
        title: 'Rénovation salle de bain Dupont',
        description: 'Pose de carrelage et installation sanitaire',
        notes: 'Prévoir des joints silicone supplémentaires',
        commentaires: ['Travaux démarrés le 01/12/2024'],
        client: 'Jean Dupont',
        status: 'En cours',
        debut_prevu: new Date('2024-12-01'),
        fin_prevu: new Date('2024-12-15'),
        personnels: [personnels[0]._id, personnels[2]._id],
        fournitures: [fournitures[0]._id, fournitures[3]._id],
        outillages: [outils[0]._id, outils[1]._id],
    },
    {
        numero: 'CH-002',
        title: 'Pose de parquet massif Garnier',
        description: 'Installation de parquet chêne massif',
        notes: 'Prévoir isolant phonique',
        commentaires: ['Début prévu le 20/12/2024'],
        client: 'Sophie Garnier',
        status: 'À venir',
        debut_prevu: new Date('2024-12-20'),
        fin_prevu: new Date('2025-01-10'),
        personnels: [personnels[1]._id, personnels[4]._id],
        fournitures: [fournitures[1]._id, fournitures[11]._id],
        outillages: [outils[4]._id, outils[5]._id],
    },
    {
        numero: 'CH-003',
        title: 'Réhabilitation cuisine Martin',
        description: 'Pose de carrelage mural et sol',
        notes: 'Prévoir carrelage anti-dérapant',
        commentaires: ['Finalisé le 15/11/2024'],
        client: 'Paul Martin',
        status: 'Terminé',
        debut_prevu: new Date('2024-11-01'),
        fin_prevu: new Date('2024-11-15'),
        personnels: [personnels[2]._id, personnels[3]._id],
        fournitures: [fournitures[8]._id, fournitures[13]._id],
        outillages: [outils[2]._id, outils[8]._id],
    },
    {
        numero: 'CH-004',
        title: 'Rénovation bureau Bernard',
        description: 'Installation parquet et plinthes',
        notes: 'Prévoir peinture murale',
        commentaires: ['Travaux prévus à partir du 05/01/2025'],
        client: 'Lucie Bernard',
        status: 'À venir',
        debut_prevu: new Date('2025-01-05'),
        fin_prevu: new Date('2025-01-20'),
        personnels: [personnels[3]._id, personnels[5]._id],
        fournitures: [fournitures[7]._id, fournitures[6]._id],
        outillages: [outils[3]._id, outils[9]._id],
    },
    {
        numero: 'CH-005',
        title: 'Construction extension Dubois',
        description: 'Pose chape et carrelage terrasse',
        notes: 'Vérifier les délais de séchage',
        commentaires: ['En cours depuis le 10/12/2024'],
        client: 'Antoine Dubois',
        status: 'En cours',
        debut_prevu: new Date('2024-12-10'),
        fin_prevu: new Date('2024-12-30'),
        personnels: [personnels[0]._id, personnels[6]._id],
        fournitures: [fournitures[2]._id, fournitures[5]._id],
        outillages: [outils[14]._id, outils[15]._id],
    },
    {
        numero: 'CH-006',
        title: 'Réaménagement salle commune Moreau',
        description: 'Installation parquet et peinture',
        notes: 'Prévoir sous-couche isolante',
        commentaires: ['Prévu pour janvier 2025'],
        client: 'Lucas Moreau',
        status: 'À venir',
        debut_prevu: new Date('2025-01-15'),
        fin_prevu: new Date('2025-02-01'),
        personnels: [personnels[8]._id, personnels[5]._id],
        fournitures: [fournitures[12]._id, fournitures[11]._id],
        outillages: [outils[18]._id, outils[19]._id],
    },
    {
        numero: 'CH-007',
        title: 'Réparation dallage Petit',
        description: 'Réparation et pose carrelage extérieur',
        notes: 'Vérifier la résistance au gel',
        commentaires: ['Chantier terminé en novembre 2024'],
        client: 'Clara Petit',
        status: 'Terminé',
        debut_prevu: new Date('2024-11-05'),
        fin_prevu: new Date('2024-11-25'),
        personnels: [personnels[9]._id, personnels[2]._id],
        fournitures: [fournitures[0]._id, fournitures[18]._id],
        outillages: [outils[16]._id, outils[17]._id],
    },
    {
        numero: 'CH-008',
        title: 'Aménagement bureau Curie',
        description: 'Pose de parquet et plinthes',
        notes: 'Prévoir finition vernissage',
        commentaires: ['Début prévu le 15/12/2024'],
        client: 'Marie Curie',
        status: 'À venir',
        debut_prevu: new Date('2024-12-15'),
        fin_prevu: new Date('2024-12-31'),
        personnels: [personnels[1]._id, personnels[7]._id],
        fournitures: [fournitures[10]._id, fournitures[13]._id],
        outillages: [outils[10]._id, outils[12]._id],
    },
    {
        numero: 'CH-009',
        title: 'Rénovation espace collectif Robert',
        description: 'Peinture et parquet',
        notes: 'Prévoir deux couches de peinture',
        commentaires: ['Chantier démarré le 01/12/2024'],
        client: 'Emma Robert',
        status: 'En cours',
        debut_prevu: new Date('2024-12-01'),
        fin_prevu: new Date('2024-12-20'),
        personnels: [personnels[6]._id, personnels[3]._id],
        fournitures: [fournitures[8]._id, fournitures[14]._id],
        outillages: [outils[11]._id, outils[15]._id],
    },
    {
        numero: 'CH-010',
        title: 'Création terrasse Leclerc',
        description: 'Pose chape et carrelage extérieur',
        notes: 'Prévoir isolation contre humidité',
        commentaires: ['Chantier prévu pour février 2025'],
        client: 'Marc Leclerc',
        status: 'À venir',
        debut_prevu: new Date('2025-02-10'),
        fin_prevu: new Date('2025-02-28'),
        personnels: [personnels[4]._id, personnels[8]._id],
        fournitures: [fournitures[2]._id, fournitures[19]._id],
        outillages: [outils[13]._id, outils[15]._id],
    },
]);


  console.log('Données seed insérées avec succès');
  mongoose.disconnect();
}

seedDatabase().catch((err) => {
  console.error('Erreur lors du seed :', err);
  mongoose.disconnect();
});
