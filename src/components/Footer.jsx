import { FacebookOutlined, GithubOutlined, InstagramOutlined, YoutubeOutlined } from "@ant-design/icons";



function Footer(){
    return (

        <footer className="bg-black/60 text-white py-7 px-auto">
          <div className="flex justify-between items-center container mx-auto">
            <h1>All Rights Reserved  © 2024 Copyright</h1>
    
            <div className="flex gap-3 items-center">
             <a href="" target="_blank"><FacebookOutlined className="text-white hover:text-blue-600" style={{ fontSize: 30  }} /></a> 
             <a href="" target="_blank"><InstagramOutlined className="text-white hover:text-blue-600" style={{ fontSize: 30  }} /></a> 
             <a href="" target="_blank"><GithubOutlined className="text-white hover:text-blue-600" style={{ fontSize: 30  }} /></a> 
             <a href="" target="_blank"><YoutubeOutlined className="text-white hover:text-blue-600" style={{ fontSize: 30  }} /></a> 
            </div>
          </div>
        </footer>
      );
}

export default Footer;