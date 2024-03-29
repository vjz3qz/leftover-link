function Card(props) {
  return (
      <div className="flex-shrink-0 w-full md:w-1/2 p-4">
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-yellow-50 dark:bg-gray-700 m-auto">
              <img className="pt-5 w-full h-52 object-contain" src={props.image} alt="Sunset in the mountains" />
              <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 dark:text-white">{props.name}</div>
                  <p className="text-gray-700 text-base dark:text-gray-300">
                      {props.description}
                  </p>
                  <div className="dark:text-gray-300">
                      <a href={props.github} className="px-2 underline">Github</a>
                      <a href={props.linkedin} className="px-2 underline">LinkedIn</a>
                      <a href={props.portfolio} className="px-2 underline">Portfolio</a>
                  </div>
              </div>
          </div>
      </div>
  );
}

function About() {
return (
  <section id="about" className="p-8 dark:bg-gray-800">
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-3xl lg:text-4xl font-bold mb-4 dark:text-white">About Us</h1>
      <div className="flex flex-col justify-center items-center">
      <p className="text-md lg:text-lg w-5/6 lg:w-full leading-relaxed text-center mb-8 dark:text-gray-300">
        We are three UVA students who are passionate about sustainability and helping the community. We built this app to connect local restaurants with nearby homeless shelters to donate unused food before it expires. Our goal is to reduce food waste while helping those in need. 
      </p>
      <div className="flex flex-wrap justify-center">
          <Card
              name="Varun Pasupuleti"
              description="Varun is a third year studying Computer Science."
              image={`${process.env.PUBLIC_URL}/images/varun.jpg`}
              github="https://github.com/vjz3qz"
              linkedin="https://www.linkedin.com/in/varunpasupuleti/"
              portfolio="https://vjz3qz.github.io/portfolio/"
           />
           <Card
              name="Niket Anand"
              description="Niket is a third year studying Computer Science and Math at UVA."
              image={`${process.env.PUBLIC_URL}/images/niket.jpg`}
              github="lol"
              linkedin="https://www.linkedin.com/in/niket-anand-236896229/"
              portfolio="lol"
           />
      </div>
      </div>
    </div>
  </section>
);
}

export default About;
