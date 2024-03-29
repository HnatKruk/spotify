import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Track } from "./schemas/track.schema";
import { Model, ObjectId, Schema } from "mongoose";
import { Comment } from "./schemas/comment.schema";
import { CreateTrackDto } from "./dtos/create-track.dto";
import { CreateCommentDto } from "./dtos/create-comment.dto";
import { FileService, FileType } from "src/file/file.service";

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<Track>,
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    private fileService: FileService,
  ) {}

  async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio)
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
    const track = await this.trackModel.create({...dto, listens: 0, audio: audioPath, picture: picturePath})
    return track
  }

  async getAll(count = 10, offset = 0): Promise<Track[]> {
    const tracks = await this.trackModel.find().skip(offset).limit(count)
    console.log(tracks)
    return tracks
  }

  async getOne(id: ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(id).populate('comments')
    return track
  }

  async delete(id: ObjectId): Promise<Track> {
    const track = await this.trackModel.findByIdAndDelete(id)
    return track
  }

  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackId)
    const comment = await this.commentModel.create({ ...dto })
    track.comments.push(comment)
    await track.save()
    return comment
  }

  async listen(id: ObjectId) {
    const track = await this.trackModel.findById(id)
    track.listens +=1
    await track.save()
  }

  async search(query: string): Promise<Track[]> {
    const tracks = await this.trackModel.find({
      name: { $regex: new RegExp(query, 'i') }
    })
    return tracks 
  }
}