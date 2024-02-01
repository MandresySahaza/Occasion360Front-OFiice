import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Typography,
    Button,
    IconButton,
    Popover,
    PopoverHandler,
    PopoverContent,
    Tooltip,
    Carousel,
  
  } from "@material-tailwind/react";
  import {
    InformationCircleIcon,
  } from "@heroicons/react/24/solid";
  import { useNavigate } from "react-router-dom";
  import { useEffect, useState } from 'react';
  import { jwtDecode } from "jwt-decode";
  

  export function Acceuil() {
  
    const navigate = useNavigate();
    const [dataAnnonces, setDataAnnonces] = useState([]);
  
    useEffect(() => {
        const getAnnonces = async () => {
    
            const apiAnnonce = "https://api-finalclouds5-production.up.railway.app/annonces/offers"; 
            try {
                const reponsePays = await fetch(apiAnnonce, {
                    method: 'GET',
                });
                if (!reponsePays.ok) {
                    throw new Error('Erreur lors de la demande.');
                }
                const data = await reponsePays.json();
                setDataAnnonces(data.result);
                console.log("dataAnnonce après la mise à jour d'état :", data);
            } catch (error) {
                console.error("une erreur c'est produite: " + error.message);
            }
    
        };
        getAnnonces();
    }, []);
  
      
  
    const submitAddFavoris = async (e, id) => {
        e.preventDefault();

        const checkToken = () => {
            const token = localStorage.getItem('token');
            console.log(token);

            if (!token) {
              navigate('/auth/sign-in');
            }
      
            try {
              const decodedtoken = jwtDecode(token);
              const now = Date.now() / 1000;
              if(now > decodedtoken.exp) localStorage.removeItem('authToken');
            } catch (error) {
              localStorage.removeItem('authToken');
              navigate('/auth/sign-in');
            }
      
        };
        checkToken();
    };
  

    return (
      <>
        <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
          <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
        </div>
        <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
          <CardBody className="p-4">
            <div className="px-4 pb-4">
              <Typography variant="h3" color="blue-gray" className="mb-2">
                Liste des annonces en cours
              </Typography>
              <br/>
              <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
              { dataAnnonces && dataAnnonces.map(
                  ({id, datePub, prix, utilisateur, voiture, description, photos}) => (
                    <Card key={id} color="transparent" shadow={false}>
                      <CardHeader
                        floated={false}
                        color="gray"
                        className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                      >
                        {photos && photos.length > 0 && (
                        <img
                          src={photos[0].lien}
                          alt="No image"
                          className="h-full w-full object-cover"
                        />
                        )}
                      </CardHeader>
                      <CardBody className="py-0 px-1">
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="mt-1 mb-2"
                        >
                          {voiture.marque.nom + " " + voiture.modele.nom}
                        </Typography>
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                        >
                          Le {datePub} par {utilisateur.nom + " " + utilisateur.prenom}
                        </Typography>
                      </CardBody>
                      <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                        <Button variant="outlined" size="sm">
                            Texto
                        </Button>
                        <Button variant="outlined" size="sm" onClick={(e) => submitAddFavoris(e, id)}>
                            Favoris
                        </Button>
                          <Popover
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }}
                      >
                        <PopoverHandler>
                          
                            <IconButton variant="text">
                            <Tooltip content="Voir détails">
                              <Button className="bg-transparent">
                                <InformationCircleIcon className="h-10 w-10 text-blue-gray-500" />
                              </Button>
                              </Tooltip>
                            </IconButton>
                          
                        </PopoverHandler>
                        <PopoverContent className="z-[999] grid w-[28rem] grid-cols-1 overflow-hidden p-0">
                        <Card className="mt-6 w-full" style={{margin:'auto'}}>
                          
                            
                              <div className="z-[999] grid w-[28rem] grid-cols-2 overflow-hidden p-0">
                                <div className="ml-2">
                                <Typography className="mt-2">Marque: {voiture.marque.nom} </Typography>
                                  <Typography className="mt-2">Modèle: {voiture.modele.nom} </Typography>
                                  <Typography className="mt-2">Catégorie: {voiture.categorie.nom} </Typography>
                                  <Typography className="mt-2">Année de mise en circulation: {voiture.modele.anneeSortie} </Typography>
                                  <Typography className="mt-2">Energie: {voiture.energie.nom} </Typography>
                                </div>
                                <div className="ml-2">
                                <Typography className="mt-2">Boite de vitesse: {voiture.boite.nom} </Typography>
                                  <Typography className="mt-2">Etat: {voiture.etatVoiture.nom} </Typography>
                                  <Typography className="mt-2">Kilometrage: {voiture.kilometrage} </Typography>
                                  <Typography className="mt-2">matricule: {voiture.matricule} </Typography>
                                  <Typography className="mt-2">description: {description} </Typography>
                                </div>
                              </div>
                              
                              <Typography variant="h3" color="green" className="mt-2" style={{margin: 'auto'}}>{prix} Ar</Typography>
  
                                <Carousel className="rounded-xl w-1/2 h-64" style={{margin: 'auto'}}>
                                { photos && photos.map(
                                    ({id, lien}) => (
                                <img
                                    key={id}
                                    src={lien}
                                    alt="No image"
                                    className="h-full w-full object-cover"
                                />
                                    ))}
                                </Carousel>
                          </Card>
                        </PopoverContent>
                      </Popover>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </div>
          </CardBody>
        </Card>
      </>
    );
  }
  
  export default Acceuil;
  
  