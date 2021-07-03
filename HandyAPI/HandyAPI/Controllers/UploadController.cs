﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace HandyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {

        //public async Task<IActionResult> Upload()
        //{
        //try
        //{
        //    var formCollection = await Request.ReadFormAsync();
        //    var file = formCollection.Files.First();
        //    var folderName = Path.Combine("Resources", "Images");
        //    var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
        //    if (file.Length > 0)
        //    {
        //        var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
        //        var fullPath = Path.Combine(pathToSave, fileName);
        //        var dbPath = Path.Combine(folderName, fileName);
        //        using (var stream = new FileStream(fullPath, FileMode.Create))
        //        {
        //            file.CopyTo(stream);
        //        }
        //        return Ok(new { dbPath });
        //    }
        //    else
        //    {
        //        return BadRequest();
        //    }
        //}
        //catch (Exception ex)
        //{
        //    throw ex;
        //}
        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            try
            {
                if (file.Length < 0)
                    return BadRequest();

                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Resources/images/", file.FileName);
                using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }
                return Ok(new { filePath });
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}