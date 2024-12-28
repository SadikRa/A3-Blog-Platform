import { FilterQuery, Query } from 'mongoose';

type QueryParams = Record<string, unknown>;

type SortOrder = 'asc' | 'desc';

type SearchableFields<T> = (keyof T)[];

class QueryBuilder<T> {
  private modelQuery: Query<T[], T>;
  private query: QueryParams;

  constructor(modelQuery: Query<T[], T>, query: QueryParams) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  
  public search(searchableFields: SearchableFields<T>): this {
    const search = this.query.search as string | undefined;

    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: search, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  public filter(): this {
    const { author } = this.query;

    if (author) {
      this.modelQuery = this.modelQuery.find({ author });
    }

    return this;
  }

  
  public sort(): this {
    const sortBy = (this.query.sortBy as string) || 'createdAt';
    const sortOrder = (this.query.sortOrder as SortOrder) === 'desc' ? '-' : '';

    this.modelQuery = this.modelQuery.sort(`${sortOrder}${sortBy}`);

    return this;
  }


  public paginate(): this {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  
  public fields(): this {
    const fields =
      (this.query.fields as string)?.split(',').join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);

    return this;
  }

 
  public async execute(): Promise<T[]> {
    return this.modelQuery.exec();
  }
}

export default QueryBuilder;
