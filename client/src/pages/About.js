import React from "react";


function Card(props) {
    return (
        <div>
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-yellow-50">
                <img className="pt-5 w-full h-52 object-contain" src={props.image} alt="Sunset in the mountains" />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{props.name}</div>
                    <p className="text-gray-700 text-base">
                        {props.description}
                    </p>
                    <div>

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
    <section id="about" className=" p-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg leading-relaxed">
          We are three UVA students who are passionate about sustainability and helping the community. We built this app to connect local restaurants with nearby homeless shelters to donate unused food before it expires. Our goal is to reduce food waste while helping those in need. 
        </p>
        <div className="flex flex-row space-x-4 pt-5">
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
            description="Niket is a third year studying Computer Science and Math at UVA. "
            image={`${process.env.PUBLIC_URL}/images/niket.jpg`}
            github="lol"
            linkedin="https://www.linkedin.com/in/niket-anand-236896229/"
            portfolio="lol"
         />
        </div>
      </div>
    </section>
  );
}

export default About;
